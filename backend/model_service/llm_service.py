"""
LLM Servisi
OpenAI-compatible API kullanarak soru üretimi yapar.
"""
import requests
import os
import json
from typing import Dict, List, Optional
from django.conf import settings

class LLMService:
    """
    LLM API ile iletişim kurar ve soru üretimi yapar.
    """
    
    def __init__(self):
        # .env'den değerleri al, tırnak işaretlerini temizle
        api_url = os.getenv('LLM_API_URL', 'http://localhost:1234/v1')
        self.api_url = api_url.strip('"\'')  # Tırnak işaretlerini temizle
        
        # Docker container'dan erişim için localhost'u host.docker.internal'a çevir
        # Docker container içinde olup olmadığımızı kontrol et
        is_docker = False
        try:
            # Method 1: /proc/self/cgroup kontrolü
            if os.path.exists('/proc/self/cgroup'):
                with open('/proc/1/cgroup', 'r') as f:
                    if 'docker' in f.read() or '/docker/' in f.read():
                        is_docker = True
        except:
            pass
        
        # Method 2: HOSTNAME kontrolü (Docker genelde container ismini HOSTNAME'e koyar)
        if not is_docker:
            hostname = os.getenv('HOSTNAME', '')
            if 'lgs_backend' in hostname or 'container' in hostname.lower():
                is_docker = True
        
        # Method 3: .dockerenv dosyası kontrolü
        if not is_docker:
            if os.path.exists('/.dockerenv'):
                is_docker = True
        
        # Docker içindeyse localhost'u host.docker.internal'a çevir
        if is_docker and ('localhost' in self.api_url or '127.0.0.1' in self.api_url):
            self.api_url = self.api_url.replace('localhost', 'host.docker.internal')
            self.api_url = self.api_url.replace('127.0.0.1', 'host.docker.internal')
            print(f"[LLM] Docker container tespit edildi, URL güncellendi: {self.api_url}")
        
        model = os.getenv('LLM_MODEL', '')
        self.model = model.strip('"\'') if model else None  # Boşsa None (opsiyonel)
        
        self.timeout = int(os.getenv('LLM_TIMEOUT', '60'))
        
        print(f"[LLM] LLM Servisi başlatıldı - URL: {self.api_url}, Model: {self.model}, Timeout: {self.timeout}s")
    
    def _make_request(self, messages: List[Dict], temperature: float = 0.7, max_tokens: int = 2000) -> Optional[str]:
        """
        LLM API'ye istek gönderir.
        
        Args:
            messages: OpenAI formatında mesaj listesi
            temperature: Yaratıcılık seviyesi (0-1)
            max_tokens: Maksimum token sayısı
            
        Returns:
            LLM'den gelen yanıt metni
        """
        try:
            url = f"{self.api_url}/chat/completions"
            
            # Model parametresi opsiyonel (bazı LLM servisleri model belirtmeden çalışır)
            payload = {
                "messages": messages,
                "temperature": temperature,
                "max_tokens": max_tokens,
                "stream": False
            }
            
            # Model belirtilmişse ekle
            if self.model:
                payload["model"] = self.model
            
            response = requests.post(
                url,
                json=payload,
                timeout=self.timeout,
                headers={"Content-Type": "application/json"}
            )
            
            response.raise_for_status()
            data = response.json()
            
            # OpenAI-compatible response format
            if 'choices' in data and len(data['choices']) > 0:
                return data['choices'][0]['message']['content']
            else:
                raise ValueError(f"Unexpected response format: {data}")
                
        except requests.exceptions.RequestException as e:
            print(f"LLM API hatası: {e}")
            return None
        except Exception as e:
            print(f"LLM işleme hatası: {e}")
            return None
    
    def generate_question_with_context(
        self, 
        topic_name: str, 
        subtopic: str,
        current_event: Optional[Dict] = None,
        example_questions: Optional[List[Dict]] = None,
        difficulty: str = "medium"
    ) -> Optional[Dict]:
        """
        Güncel olay ve örnek sorularla birlikte soru üretir.
        
        Args:
            topic_name: Ana konu (örn: "Paragrafta Anlam")
            subtopic: Alt konu (örn: "Ana Düşünce")
            current_event: Güncel olay bilgisi
            example_questions: Örnek sorular (veri setinden)
            difficulty: Zorluk seviyesi
            
        Returns:
            Üretilen soru sözlüğü
        """
        # Sistem promptu
        system_prompt = """Sen bir LGS Türkçe sınavı soru yazarısın. Görevin, verilen konu ve güncel olaylara dayalı olarak LGS formatında kaliteli, kısa ve net sorular üretmek.

ÖNEMLİ KURALLAR:
1. Soru metni MUTLAKA kısa olmalı (maksimum 2-3 cümle, 100-150 kelime)
2. Soru metni doğrudan ve net olmalı, gereksiz detaylar içermemeli
3. Güncel olay sadece soru bağlamında kullanılmalı, soru metnini uzatmamalı
4. Şıklar kısa ve öz olmalı (her şık maksimum 1 cümle)
5. Şıklar doğru ve mantıklı olmalı (örneğin: Fiilimsiler için sadece İsim-fiil, Sıfat-fiil, Zarf-fiil kullanılmalı)
6. Doğru cevap kesin ve tek olmalı
7. Yanlış şıklar (distractor) mantıklı ama yanlış olmalı
8. LGS seviyesine uygun olmalı (8. sınıf seviyesi)

SORU FORMATI ÖRNEKLERİ:
- Fiilimsiler için: "Aşağıdaki cümlelerin hangisinde fiilimsi kullanılmıştır?" veya "Aşağıdaki cümlelerin hangisinde altı çizili sözcük fiilimsidir?"
- Paragrafta Anlam için: Kısa bir paragraf verip "Bu parçada asıl anlatılmak istenen aşağıdakilerden hangisidir?" gibi sorular

Yanıtını SADECE JSON formatında ver (açıklama ekleme):
{
    "question_text": "Kısa ve net soru metni (maksimum 150 kelime)",
    "option_a": "Kısa şık (maksimum 1 cümle)",
    "option_b": "Kısa şık (maksimum 1 cümle)",
    "option_c": "Kısa şık (maksimum 1 cümle)",
    "option_d": "Kısa şık (maksimum 1 cümle)",
    "correct_answer": "A",
    "explanation": "Kısa çözüm açıklaması"
}"""

        # Örnek soruları formatla
        examples_text = ""
        if example_questions:
            examples_text = "\n\nÖrnek Sorular:\n"
            for i, ex in enumerate(example_questions[:3], 1):  # En fazla 3 örnek
                examples_text += f"\nÖrnek {i}:\n"
                examples_text += f"Soru: {ex.get('Soru_Metni', '')[:200]}...\n"
                examples_text += f"A) {ex.get('Secenek_A', '')}\n"
                examples_text += f"B) {ex.get('Secenek_B', '')}\n"
                examples_text += f"C) {ex.get('Secenek_C', '')}\n"
                examples_text += f"D) {ex.get('Secenek_D', '')}\n"
                examples_text += f"Doğru Cevap: {ex.get('Dogru_Cevap', '')}\n"
        
        # Güncel olay bilgisi (sadece bağlam için, soru metnini uzatmamalı)
        event_text = ""
        if current_event:
            event_title = current_event.get('title', '')[:50]  # Kısa başlık
            event_desc = current_event.get('description', '')[:100]  # Kısa açıklama
            event_text = f"\n\nGüncel Olay Bağlamı (sadece referans için):\n{event_title}\n{event_desc}\n\nNOT: Güncel olayı soruya sadece doğal bir şekilde entegre et. Soru metnini uzatmamalı, sadece bağlam sağlamalı. Örneğin: 'Eğitimde dijitalleşme döneminde...' gibi kısa bir giriş yeterli."
        
        # Konuya özel talimatlar
        topic_instructions = ""
        if "Fiilimsiler" in topic_name:
            topic_instructions = "\n\nÖNEMLİ: Fiilimsiler için şıklar sadece şunlar olabilir: İsim-fiil, Sıfat-fiil, Zarf-fiil. Başka şık kullanma (örneğin: Özne-fiil, Nesne-fiil gibi yanlış şıklar kullanma)."
        elif "Paragrafta Anlam" in topic_name:
            topic_instructions = "\n\nÖNEMLİ: Paragrafta Anlam soruları için kısa bir paragraf (3-4 cümle) ver ve sonra soruyu sor. Paragraf çok uzun olmamalı."
        
        # Kullanıcı promptu
        user_prompt = f"""Konu: {topic_name}
Alt Konu: {subtopic}
Zorluk Seviyesi: {difficulty}

{examples_text}

{event_text}

{topic_instructions}

Lütfen bu bilgilere dayanarak KISA, NET ve LGS formatına uygun bir Türkçe sorusu üret. Soru metni maksimum 150 kelime olmalı. Şıklar kısa ve öz olmalı. SADECE JSON formatında yanıt ver."""

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
        
        # Temperature ayarı (zorluk seviyesine göre)
        temperature_map = {
            "easy": 0.5,
            "medium": 0.7,
            "hard": 0.9
        }
        temperature = temperature_map.get(difficulty, 0.7)
        
        # LLM'den yanıt al
        response_text = self._make_request(messages, temperature=temperature)
        
        if not response_text:
            return None
        
        # JSON'ı parse et
        try:
            # JSON bloğunu bul (```json ... ``` veya sadece JSON)
            if "```json" in response_text:
                json_start = response_text.find("```json") + 7
                json_end = response_text.find("```", json_start)
                json_text = response_text[json_start:json_end].strip()
            elif "```" in response_text:
                json_start = response_text.find("```") + 3
                json_end = response_text.find("```", json_start)
                json_text = response_text[json_start:json_end].strip()
            else:
                json_text = response_text.strip()
            
            # JSON parse et
            question_data = json.loads(json_text)
            
            # Eksik alanları kontrol et
            required_fields = ['question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_answer']
            for field in required_fields:
                if field not in question_data:
                    print(f"[LLM] Eksik alan: {field}")
                    return None
            
            # Soru kalitesi kontrolü
            question_text = question_data.get('question_text', '')
            # Soru metni çok uzunsa uyar
            word_count = len(question_text.split())
            if word_count > 200:
                print(f"[LLM] UYARI: Soru metni çok uzun ({word_count} kelime), kısaltılmalı")
            
            # Doğru cevap kontrolü
            correct_answer = question_data.get('correct_answer', '').upper()
            if correct_answer not in ['A', 'B', 'C', 'D']:
                print(f"[LLM] HATA: Geçersiz doğru cevap: {correct_answer}")
                return None
            
            # Fiilimsiler için şık kontrolü
            if "fiilimsi" in question_text.lower() or "fiilimsi" in topic_name.lower():
                option_keys = ['option_a', 'option_b', 'option_c', 'option_d']
                invalid_types = ['özne-fiil', 'nesne-fiil', 'özne fiil', 'nesne fiil', 'öznefiil', 'nesnefiil']
                
                for key in option_keys:
                    opt_value = question_data.get(key, '').lower()
                    for inv in invalid_types:
                        if inv in opt_value:
                            print(f"[LLM] UYARI: Geçersiz fiilimsi türü tespit edildi: {opt_value}")
                            # Geçersiz şıkları düzelt - en yakın geçerli türe çevir
                            if 'özne' in inv:
                                question_data[key] = opt_value.replace(inv, 'İsim-fiil').capitalize()
                            elif 'nesne' in inv:
                                question_data[key] = opt_value.replace(inv, 'Sıfat-fiil').capitalize()
            
            return {
                "question_text": question_data['question_text'],
                "option_a": question_data['option_a'],
                "option_b": question_data['option_b'],
                "option_c": question_data['option_c'],
                "option_d": question_data['option_d'],
                "correct_answer": question_data['correct_answer'].upper(),
                "explanation": question_data.get('explanation', '')
            }
            
        except json.JSONDecodeError as e:
            print(f"JSON parse hatası: {e}")
            print(f"Yanıt metni: {response_text[:500]}")
            return None
        except Exception as e:
            print(f"Soru işleme hatası: {e}")
            return None
    
    def generate_question_simple(self, topic_name: str, current_event: Optional[Dict] = None) -> Optional[Dict]:
        """
        Basit soru üretimi (örnek sorular olmadan).
        """
        return self.generate_question_with_context(
            topic_name=topic_name,
            subtopic="Genel",
            current_event=current_event,
            example_questions=None,
            difficulty="medium"
        )

