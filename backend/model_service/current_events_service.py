"""
Güncel Olaylar Servisi
Türkiye'deki son 6 aydaki önemli güncel olayları çeker ve soru üretiminde kullanır.
"""
import requests
from datetime import datetime, timedelta
from typing import List, Dict
import json
import os
from pathlib import Path

class CurrentEventsService:
    """
    Güncel olayları çekmek ve yönetmek için servis.
    News API veya manuel veri kaynağı kullanabilir.
    """
    
    def __init__(self):
        self.cache_file = Path(__file__).parent.parent / 'data' / 'current_events.json'
        self.cache_duration_days = 1  # Cache 1 gün geçerli
        
    def get_recent_events(self, months: int = 6) -> List[Dict]:
        """
        Son N aydaki güncel olayları döndürür.
        
        Args:
            months: Kaç ay geriye gidileceği (varsayılan: 6)
            
        Returns:
            Güncel olaylar listesi
        """
        # Önce cache'i kontrol et
        cached_events = self._load_from_cache()
        if cached_events:
            return cached_events
            
        # Cache yoksa veya eskiyse, yeni veri çek
        events = self._fetch_events(months)
        
        # Cache'e kaydet
        self._save_to_cache(events)
        
        return events
    
    def _fetch_events(self, months: int) -> List[Dict]:
        """
        Güncel olayları çeker. Önce News API dener, yoksa manuel veri döner.
        """
        # News API ile çekmeyi dene (API key varsa)
        news_api_key = os.getenv('NEWS_API_KEY')
        if news_api_key:
            try:
                return self._fetch_from_news_api(news_api_key, months)
            except Exception as e:
                print(f"News API hatası: {e}")
        
        # API yoksa veya hata varsa, manuel güncel olaylar döndür
        return self._get_manual_events()
    
    def _fetch_from_news_api(self, api_key: str, months: int) -> List[Dict]:
        """
        News API'den Türkiye haberlerini çeker.
        """
        url = "https://newsapi.org/v2/everything"
        params = {
            'q': 'Türkiye OR Turkey',
            'language': 'tr',
            'sortBy': 'publishedAt',
            'pageSize': 50,
            'from': (datetime.now() - timedelta(days=months*30)).strftime('%Y-%m-%d'),
            'apiKey': api_key
        }
        
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        events = []
        for article in data.get('articles', [])[:30]:  # En fazla 30 haber
            events.append({
                'title': article.get('title', ''),
                'description': article.get('description', ''),
                'published_at': article.get('publishedAt', ''),
                'source': article.get('source', {}).get('name', ''),
                'category': self._categorize_event(article.get('title', '') + ' ' + article.get('description', ''))
            })
        
        return events
    
    def _categorize_event(self, text: str) -> str:
        """
        Olayı kategorize eder (Eğitim, Ekonomi, Teknoloji, Çevre, vb.)
        """
        text_lower = text.lower()
        
        if any(word in text_lower for word in ['eğitim', 'okul', 'öğrenci', 'üniversite', 'sınav', 'lgs', 'yks']):
            return 'Eğitim'
        elif any(word in text_lower for word in ['ekonomi', 'ekonomik', 'enflasyon', 'döviz', 'borsa']):
            return 'Ekonomi'
        elif any(word in text_lower for word in ['teknoloji', 'yapay zeka', 'dijital', 'yazılım']):
            return 'Teknoloji'
        elif any(word in text_lower for word in ['çevre', 'iklim', 'doğa', 'küresel ısınma', 'sürdürülebilir']):
            return 'Çevre'
        elif any(word in text_lower for word in ['sağlık', 'tıp', 'hastane', 'ilaç']):
            return 'Sağlık'
        elif any(word in text_lower for word in ['kültür', 'sanat', 'edebiyat', 'müze']):
            return 'Kültür'
        else:
            return 'Genel'
    
    def _get_manual_events(self) -> List[Dict]:
        """
        Manuel olarak eklenen güncel olaylar.
        Bu liste düzenli olarak güncellenmelidir.
        """
        # Son 6 aydaki önemli Türkiye güncel olayları (örnek)
        return [
            {
                'title': 'Türkiye\'de Yapay Zeka ve Dijital Dönüşüm',
                'description': 'Türkiye\'de yapay zeka teknolojilerinin eğitim ve endüstri alanlarında kullanımı artıyor.',
                'published_at': (datetime.now() - timedelta(days=30)).isoformat(),
                'source': 'Manuel',
                'category': 'Teknoloji'
            },
            {
                'title': 'İklim Değişikliği ve Çevre Politikaları',
                'description': 'Türkiye\'de sürdürülebilir enerji ve çevre koruma çalışmaları hız kazanıyor.',
                'published_at': (datetime.now() - timedelta(days=60)).isoformat(),
                'source': 'Manuel',
                'category': 'Çevre'
            },
            {
                'title': 'Eğitimde Dijitalleşme ve Uzaktan Eğitim',
                'description': 'Eğitim sisteminde dijital araçların kullanımı ve öğrenci başarısı üzerindeki etkileri.',
                'published_at': (datetime.now() - timedelta(days=90)).isoformat(),
                'source': 'Manuel',
                'category': 'Eğitim'
            },
            {
                'title': 'Türkiye\'nin Ekonomik Büyümesi ve Kalkınma',
                'description': 'Türkiye\'nin ekonomik göstergeleri ve kalkınma projeleri hakkında güncel gelişmeler.',
                'published_at': (datetime.now() - timedelta(days=120)).isoformat(),
                'source': 'Manuel',
                'category': 'Ekonomi'
            },
            {
                'title': 'Kültürel Miras ve Tarih Koruma Çalışmaları',
                'description': 'Türkiye\'deki tarihi eserlerin korunması ve kültürel mirasın gelecek nesillere aktarılması.',
                'published_at': (datetime.now() - timedelta(days=150)).isoformat(),
                'source': 'Manuel',
                'category': 'Kültür'
            },
            {
                'title': 'Sağlık Sisteminde Yenilikler',
                'description': 'Türkiye\'de sağlık hizmetlerinde dijitalleşme ve hasta bakım kalitesinin artırılması.',
                'published_at': (datetime.now() - timedelta(days=180)).isoformat(),
                'source': 'Manuel',
                'category': 'Sağlık'
            }
        ]
    
    def _load_from_cache(self) -> List[Dict]:
        """Cache'den yükle"""
        if not self.cache_file.exists():
            return None
        
        try:
            cache_data = json.loads(self.cache_file.read_text(encoding='utf-8'))
            cache_time = datetime.fromisoformat(cache_data.get('cached_at', ''))
            
            # Cache geçerli mi kontrol et
            if (datetime.now() - cache_time).days < self.cache_duration_days:
                return cache_data.get('events', [])
        except Exception as e:
            print(f"Cache yükleme hatası: {e}")
        
        return None
    
    def _save_to_cache(self, events: List[Dict]):
        """Cache'e kaydet"""
        try:
            cache_data = {
                'cached_at': datetime.now().isoformat(),
                'events': events
            }
            self.cache_file.parent.mkdir(parents=True, exist_ok=True)
            self.cache_file.write_text(json.dumps(cache_data, ensure_ascii=False, indent=2), encoding='utf-8')
        except Exception as e:
            print(f"Cache kaydetme hatası: {e}")
    
    def get_events_by_category(self, category: str) -> List[Dict]:
        """Belirli bir kategorideki olayları döndürür"""
        all_events = self.get_recent_events()
        return [event for event in all_events if event.get('category') == category]
    
    def get_events_for_subject(self, subject: str) -> List[Dict]:
        """
        Türkçe dersi için uygun güncel olayları döndürür.
        Türkçe soruları için kültür, eğitim, edebiyat, sanat gibi konular uygundur.
        """
        all_events = self.get_recent_events()
        
        # Türkçe için uygun kategoriler
        relevant_categories = ['Kültür', 'Eğitim', 'Genel', 'Sanat', 'Edebiyat']
        
        relevant_events = [
            event for event in all_events 
            if event.get('category') in relevant_categories
        ]
        
        # Eğer yeterli olay yoksa, tüm olayları döndür
        if len(relevant_events) < 3:
            relevant_events = all_events[:10]
        
        return relevant_events[:10]  # En fazla 10 olay döndür

