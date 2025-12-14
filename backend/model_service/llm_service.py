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
        
        model = os.getenv('LLM_MODEL', '')
        self.model = model.strip('"\'') if model else 'llama3.2'  # Boşsa varsayılan kullan
        
        self.timeout = int(os.getenv('LLM_TIMEOUT', '60'))
    
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
            
            payload = {
                "model": self.model,
                "messages": messages,
                "temperature": temperature,
                "max_tokens": max_tokens,
                "stream": False
            }
            
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
        system_prompt = """Sen bir LGS Türkçe sınavı soru yazarısın. Görevin, verilen konu ve güncel olaylara dayalı olarak LGS formatında kaliteli sorular üretmek.

Soru formatı:
- Soru metni net ve anlaşılır olmalı
- 4 şık (A, B, C, D) olmalı
- Doğru cevap mantıklı ve tek olmalı
- Yanlış şıklar (distractor) mantıklı ama yanlış olmalı
- LGS seviyesine uygun olmalı

Yanıtını JSON formatında ver:
{
    "question_text": "Soru metni buraya",
    "option_a": "A şıkkı",
    "option_b": "B şıkkı",
    "option_c": "C şıkkı",
    "option_d": "D şıkkı",
    "correct_answer": "A",
    "explanation": "Çözüm açıklaması"
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
        
        # Güncel olay bilgisi
        event_text = ""
        if current_event:
            event_text = f"\n\nGüncel Olay Bağlamı:\nBaşlık: {current_event.get('title', '')}\nAçıklama: {current_event.get('description', '')}\n\nBu güncel olayı soruya entegre et. Soru metninde veya şıklarda güncel olayla ilgili referanslar kullan."
        
        # Kullanıcı promptu
        user_prompt = f"""Konu: {topic_name}
Alt Konu: {subtopic}
Zorluk Seviyesi: {difficulty}

{examples_text}

{event_text}

Lütfen bu bilgilere dayanarak bir LGS Türkçe sorusu üret. Soru, verilen örneklerin formatına ve stiline uygun olmalı."""

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
                    print(f"Eksik alan: {field}")
                    return None
            
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

