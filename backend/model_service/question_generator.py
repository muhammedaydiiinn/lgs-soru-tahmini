"""
Türkçe Soru Üretme Servisi
Konu bazlı ve güncel olayları içeren LGS Türkçe soruları üretir.
LLM ve mevcut verileri kullanarak soru üretir.
"""
import random
from typing import Dict, List, Optional
from .current_events_service import CurrentEventsService
from .llm_service import LLMService
from .data_service import DataService

class QuestionGenerator:
    """
    LGS Türkçe formatında sorular üretir.
    Konu bazlı ve güncel olayları entegre eder.
    """
    
    def __init__(self):
        self.events_service = CurrentEventsService()
        self.llm_service = LLMService()
        self.data_service = DataService()
        
        # Türkçe dersine özel soru şablonları
        self.turkish_topics = {
            "Paragrafta Anlam": {
                "subtopics": ["Ana Düşünce", "Yardımcı Düşünce", "Paragraf Tamamlama", "Paragraf Oluşturma", "Anlatım Biçimleri"],
                "templates": [
                    {
                        "type": "ana_dusunce",
                        "template": "{event_description}\n\nBu parçada asıl anlatılmak istenen aşağıdakilerden hangisidir?",
                        "options_pattern": "ana_dusunce"
                    },
                    {
                        "type": "yardimci_dusunce",
                        "template": "{event_description}\n\nBu parçadan aşağıdakilerden hangisi çıkarılamaz?",
                        "options_pattern": "yardimci_dusunce"
                    },
                    {
                        "type": "paragraf_tamamlama",
                        "template": "{event_description}\n\nBu parçanın sonuna aşağıdakilerden hangisi getirilmelidir?",
                        "options_pattern": "paragraf_tamamlama"
                    },
                    {
                        "type": "yazar_amaci",
                        "template": "{event_description}\n\nBu parçada yazarın amacı aşağıdakilerden hangisidir?",
                        "options_pattern": "yazar_amaci"
                    }
                ]
            },
            "Sözcükte Anlam": {
                "subtopics": ["Eş Anlamlı", "Zıt Anlamlı", "Söz Sanatları", "Deyimler", "Atasözleri", "Anlam İlişkileri"],
                "templates": [
                    {
                        "type": "es_anlamli",
                        "template": "\"{word}\" sözcüğü aşağıdakilerin hangisinde \"{meaning}\" anlamında kullanılmıştır?",
                        "options_pattern": "es_anlamli"
                    },
                    {
                        "type": "soz_sanatlari",
                        "template": "{event_description}\n\nBu parçada aşağıdaki söz sanatlarından hangisi kullanılmıştır?",
                        "options_pattern": "soz_sanatlari"
                    },
                    {
                        "type": "deyim",
                        "template": "Aşağıdaki cümlelerin hangisinde \"{deyim}\" deyimi yanlış kullanılmıştır?",
                        "options_pattern": "deyim"
                    }
                ]
            },
            "Cümlenin Ögeleri": {
                "subtopics": ["Özne", "Yüklem", "Nesne", "Dolaylı Tümleç", "Zarf Tümleci"],
                "templates": [
                    {
                        "type": "ogeler",
                        "template": "\"{event_context} kapsamında yapılan çalışmalar başarılı olmuştur.\" cümlesinde \"çalışmalar\" kelimesi cümlenin hangi ögesidir?",
                        "options_pattern": "ogeler"
                    },
                    {
                        "type": "yuklem",
                        "template": "\"{event_context} için hazırlanan proje onaylanmıştır.\" cümlesinde \"onaylanmıştır\" kelimesi cümlenin hangi ögesidir?",
                        "options_pattern": "ogeler"
                    }
                ]
            },
            "Fiilimsiler": {
                "subtopics": ["İsim Fiil", "Sıfat Fiil", "Zarf Fiil"],
                "templates": [
                    {
                        "type": "fiilimsi",
                        "template": "Aşağıdaki cümlelerin hangisinde fiilimsi kullanılmıştır?",
                        "options_pattern": "fiilimsi"
                    }
                ]
            },
            "Cümlede Anlam": {
                "subtopics": ["Neden-Sonuç", "Amaç-Sonuç", "Koşul-Sonuç", "Karşılaştırma"],
                "templates": [
                    {
                        "type": "anlam_iliskisi",
                        "template": "{event_description}\n\nBu cümlede aşağıdaki anlam ilişkilerinden hangisi vardır?",
                        "options_pattern": "anlam_iliskisi"
                    }
                ]
            },
            "Yazım Kuralları": {
                "subtopics": ["Büyük Harf", "Birleşik Kelimeler", "Kısaltmalar"],
                "templates": [
                    {
                        "type": "yazim",
                        "template": "Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?",
                        "options_pattern": "yazim"
                    }
                ]
            },
            "Noktalama İşaretleri": {
                "subtopics": ["Virgül", "Nokta", "İki Nokta", "Noktalı Virgül"],
                "templates": [
                    {
                        "type": "noktalama",
                        "template": "Aşağıdaki cümlelerin hangisinde noktalama işareti yanlış kullanılmıştır?",
                        "options_pattern": "noktalama"
                    }
                ]
            },
            "Sözel Mantık": {
                "subtopics": ["Çıkarım", "Yorumlama", "Sıralama"],
                "templates": [
                    {
                        "type": "sozel_mantik",
                        "template": "{event_description}\n\nBu parçadan aşağıdakilerden hangisine kesinlikle ulaşılabilir?",
                        "options_pattern": "sozel_mantik"
                    }
                ]
            }
        }
    
    def generate_question(self, topic_name: str, difficulty: str = "medium", 
                         include_current_event: bool = True, use_llm: bool = True) -> Dict:
        """
        Belirli bir Türkçe konusu için soru üretir.
        LLM ve mevcut verileri kullanır.
        
        Args:
            topic_name: Konu adı (örn: "Paragrafta Anlam")
            difficulty: Zorluk seviyesi (easy, medium, hard)
            include_current_event: Güncel olay eklenip eklenmeyeceği
            use_llm: LLM kullanılsın mı (True) yoksa şablon mu (False)
            
        Returns:
            Soru sözlüğü
        """
        # Güncel olay seç
        current_event = None
        if include_current_event:
            events = self.events_service.get_events_for_subject("Türkçe")
            if events:
                current_event = random.choice(events)
        
        # LLM ile soru üret
        if use_llm:
            try:
                # Örnek soruları getir
                example_questions = self.data_service.get_example_questions(
                    topic_name=topic_name,
                    limit=3
                )
                
                # Alt konu belirle
                subtopics = self.data_service.get_subtopics(topic_name)
                subtopic = random.choice(subtopics) if subtopics else "Genel"
                
                # LLM ile soru üret
                llm_result = self.llm_service.generate_question_with_context(
                    topic_name=topic_name,
                    subtopic=subtopic,
                    current_event=current_event,
                    example_questions=example_questions,
                    difficulty=difficulty
                )
                
                if llm_result:
                    return {
                        "subject": "Türkçe",
                        "topic_name": topic_name,
                        "question_text": llm_result['question_text'],
                        "option_a": llm_result['option_a'],
                        "option_b": llm_result['option_b'],
                        "option_c": llm_result['option_c'],
                        "option_d": llm_result['option_d'],
                        "correct_answer": llm_result['correct_answer'],
                        "difficulty": difficulty,
                        "current_event_context": current_event.get('description', '') if current_event else '',
                        "explanation": llm_result.get('explanation', '')
                    }
            except Exception as e:
                print(f"LLM soru üretimi hatası: {e}")
                # Hata durumunda şablon yöntemine geç
        
        # Fallback: Şablon yöntemi
        return self._generate_question_with_template(topic_name, difficulty, current_event)
    
    def _generate_question_with_template(self, topic_name: str, difficulty: str, current_event: Optional[Dict]) -> Dict:
        """Şablon yöntemiyle soru üret (fallback)"""
        # Konu bilgilerini al
        topic_data = self.turkish_topics.get(topic_name)
        if not topic_data:
            raise ValueError(f"Desteklenmeyen konu: {topic_name}. Desteklenen konular: {', '.join(self.turkish_topics.keys())}")
        
        event_context = current_event.get('title', '') if current_event else ""
        event_description = self._create_paragraph_from_event(current_event) if current_event else ""
        
        # Şablon seç
        templates = topic_data.get("templates", [])
        if not templates:
            return self._create_simple_question(topic_name, event_context, difficulty)
        
        template_data = random.choice(templates)
        template = template_data["template"]
        options_pattern = template_data["options_pattern"]
        
        # Şablonu doldur
        question_text = self._fill_template(template, event_context, event_description, topic_name)
        
        # Şıkları oluştur
        options, correct_answer = self._generate_options_for_turkish(
            options_pattern, topic_name, question_text, event_description, difficulty
        )
        
        # Açıklama oluştur
        explanation = self._generate_explanation(topic_name, correct_answer)
        
        return {
            "subject": "Türkçe",
            "topic_name": topic_name,
            "question_text": question_text,
            "option_a": options[0],
            "option_b": options[1],
            "option_c": options[2],
            "option_d": options[3],
            "correct_answer": correct_answer,
            "difficulty": difficulty,
            "current_event_context": current_event.get('description', '') if current_event else '',
            "explanation": explanation
        }
    
    def _create_paragraph_from_event(self, event: Dict) -> str:
        """Güncel olaydan paragraf oluştur"""
        title = event.get('title', '')
        description = event.get('description', '')
        
        # Paragraf formatında birleştir
        paragraph = f"{title}. {description}"
        
        # Eğer çok kısaysa genişlet
        if len(paragraph) < 100:
            paragraph += " Bu konu hakkında yapılan araştırmalar ve gelişmeler, toplumun ilgisini çekmektedir. Uzmanlar bu konunun önemine dikkat çekmektedir."
        
        return paragraph
    
    def _fill_template(self, template: str, event_context: str, event_description: str, topic_name: str) -> str:
        """Şablonu parametrelerle doldur"""
        filled = template
        
        # Event context ve description'ı ekle
        if "{event_context}" in filled:
            filled = filled.replace("{event_context}", event_context if event_context else "güncel bir proje")
        
        if "{event_description}" in filled:
            filled = filled.replace("{event_description}", event_description if event_description else self._get_default_paragraph())
        
        # Diğer placeholder'ları doldur
        if "{word}" in filled:
            words = ["gelişme", "ilerleme", "değişim", "dönüşüm", "yenilik"]
            filled = filled.replace("{word}", random.choice(words))
        
        if "{meaning}" in filled:
            meanings = ["ilerleme", "gelişme", "değişiklik", "yenilik"]
            filled = filled.replace("{meaning}", random.choice(meanings))
        
        if "{deyim}" in filled:
            deyimler = ["gözden kaçırmak", "kulak asmamak", "göz atmak", "el atmak"]
            filled = filled.replace("{deyim}", random.choice(deyimler))
        
        return filled
    
    def _get_default_paragraph(self) -> str:
        """Varsayılan paragraf metni"""
        paragraphs = [
            "Güncel gelişmeler, toplumun her kesimini etkilemektedir. Bu değişimler, bireylerin yaşam tarzlarını ve düşünce yapılarını şekillendirmektedir.",
            "Modern dünyada yaşanan hızlı değişimler, insanların uyum sağlama yeteneklerini test etmektedir. Bu süreçte, bilgiye erişim ve doğru kaynaklardan öğrenme büyük önem kazanmaktadır.",
            "Toplumsal gelişmeler, bireylerin ve kurumların sürekli kendini yenilemesini gerektirmektedir. Bu yenilenme süreci, hem kişisel hem de toplumsal düzeyde faydalı sonuçlar doğurmaktadır."
        ]
        return random.choice(paragraphs)
    
    def _generate_options_for_turkish(self, pattern: str, topic_name: str, question_text: str, 
                                     event_description: str, difficulty: str) -> tuple:
        """Türkçe soruları için şıkları oluştur"""
        
        if pattern == "ana_dusunce":
            options = [
                "Güncel gelişmelerin toplum üzerindeki etkileri ve önemi vurgulanmaktadır.",
                "Değişimlerin bireylerin yaşamına olan olumlu katkıları anlatılmaktadır.",
                "Bilgiye erişimin modern dünyadaki önemi ve gerekliliği belirtilmektedir.",
                "Toplumsal yenilenmenin hem kişisel hem de toplumsal faydaları açıklanmaktadır."
            ]
            correct_answer = "A"
        
        elif pattern == "yardimci_dusunce":
            options = [
                "Güncel olayların toplum üzerinde etkisi vardır.",
                "Değişimler sürekli bir süreçtir.",
                "Bu konuyla ilgili tüm sorunlar çözülmüştür.",
                "Bilgiye erişim önemlidir."
            ]
            correct_answer = "C"
        
        elif pattern == "paragraf_tamamlama":
            options = [
                "Bu nedenle, sürekli öğrenme ve gelişim büyük önem taşımaktadır.",
                "Ancak, bu durum herkes için geçerli değildir.",
                "Oysa, geçmişte durum farklıydı.",
                "Çünkü, değişim her zaman olumlu sonuçlar doğurmaz."
            ]
            correct_answer = "A"
        
        elif pattern == "yazar_amaci":
            options = [
                "Okuyucuyu bilgilendirmek ve düşündürmek",
                "Bir konuda ikna etmeye çalışmak",
                "Eğlendirmek ve hoş vakit geçirtmek",
                "Bir olayı anlatmak ve tanıtmak"
            ]
            correct_answer = "A"
        
        elif pattern == "ogeler":
            options = [
                "Özne",
                "Yüklem",
                "Nesne",
                "Dolaylı Tümleç"
            ]
            correct_answer = "A"
        
        elif pattern == "soz_sanatlari":
            options = [
                "Benzetme",
                "Kişileştirme",
                "Abartma",
                "Teşhis"
            ]
            correct_answer = random.choice(["A", "B", "C", "D"])
        
        elif pattern == "anlam_iliskisi":
            options = [
                "Neden-Sonuç",
                "Amaç-Sonuç",
                "Koşul-Sonuç",
                "Karşılaştırma"
            ]
            correct_answer = random.choice(["A", "B", "C", "D"])
        
        elif pattern == "sozel_mantik":
            options = [
                "Güncel gelişmeler toplumu etkilemektedir.",
                "Değişimler sürekli bir süreçtir.",
                "Bilgiye erişim önemlidir.",
                "Yenilenme hem kişisel hem toplumsal fayda sağlar."
            ]
            correct_answer = random.choice(["A", "B", "C", "D"])
        
        else:
            # Varsayılan şıklar
            options = [
                "Seçenek A",
                "Seçenek B",
                "Seçenek C",
                "Seçenek D"
            ]
            correct_answer = "A"
        
        # Şıkları karıştır (doğru cevabı koru)
        correct_option = options[ord(correct_answer) - ord('A')]
        random.shuffle(options)
        new_correct_index = options.index(correct_option)
        correct_answer = chr(ord('A') + new_correct_index)
        
        return options, correct_answer
    
    def _generate_explanation(self, topic_name: str, correct_answer: str) -> str:
        """Çözüm açıklaması oluştur"""
        explanations = {
            "Paragrafta Anlam": f"Bu soru {topic_name} konusunu test etmektedir. Paragrafı dikkatlice okuyup ana düşünceyi bulmanız gerekmektedir. Doğru cevap {correct_answer} şıkkıdır.",
            "Sözcükte Anlam": f"Bu soru {topic_name} konusunu test etmektedir. Sözcüklerin anlamlarını ve kullanımlarını iyi bilmeniz gerekmektedir. Doğru cevap {correct_answer} şıkkıdır.",
            "Cümlenin Ögeleri": f"Bu soru {topic_name} konusunu test etmektedir. Cümlenin ögelerini ayırt edebilmeniz gerekmektedir. Doğru cevap {correct_answer} şıkkıdır.",
        }
        
        return explanations.get(topic_name, f"Bu soru {topic_name} konusunu test etmektedir. Doğru cevap {correct_answer} şıkkıdır.")
    
    def _create_simple_question(self, topic_name: str, event_context: str, difficulty: str) -> Dict:
        """Basit bir soru oluştur (şablon yoksa)"""
        question_text = f"{event_context if event_context else 'Güncel bir konu'} kapsamında {topic_name} konusuyla ilgili bir soru:"
        
        options = [
            "Seçenek A",
            "Seçenek B",
            "Seçenek C",
            "Seçenek D"
        ]
        
        return {
            "subject": "Türkçe",
            "topic_name": topic_name,
            "question_text": question_text,
            "option_a": options[0],
            "option_b": options[1],
            "option_c": options[2],
            "option_d": options[3],
            "correct_answer": "A",
            "difficulty": difficulty,
            "current_event_context": event_context,
            "explanation": "Bu soru için detaylı açıklama eklenecektir."
        }