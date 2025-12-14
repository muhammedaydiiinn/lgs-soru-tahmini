"""
Veri Servisi
CSV dosyasından örnek soruları yükler ve filtreler.
"""
import pandas as pd
import os
from pathlib import Path
from typing import List, Dict, Optional

class DataService:
    """
    LGS veri setini yükler ve filtreler.
    """
    
    def __init__(self):
        # CSV dosya yolu - Docker'da /app/data, local'de backend/data
        base_dir = Path(__file__).parent.parent.parent
        # Önce Docker path'i dene, yoksa local path'i kullan
        docker_path = Path('/app/data/lgs_full_data.csv')
        local_path = base_dir / 'data' / 'lgs_full_data.csv'
        
        if docker_path.exists():
            self.csv_path = docker_path
        elif local_path.exists():
            self.csv_path = local_path
        else:
            # Varsayılan olarak local path kullan (hata mesajı için)
            self.csv_path = local_path
        
        self._df = None
    
    def _load_data(self):
        """Veriyi yükle (lazy loading)"""
        if self._df is None:
            if not self.csv_path.exists():
                raise FileNotFoundError(f"Veri dosyası bulunamadı: {self.csv_path}")
            self._df = pd.read_csv(self.csv_path)
            # Eksik değerleri temizle
            self._df = self._df.fillna("")
        return self._df
    
    def get_example_questions(
        self, 
        topic_name: str, 
        limit: int = 5,
        exclude_ids: Optional[List[int]] = None
    ) -> List[Dict]:
        """
        Belirli bir konu için örnek sorular getirir.
        
        Args:
            topic_name: Konu adı (örn: "Paragrafta Anlam")
            limit: Maksimum soru sayısı
            exclude_ids: Hariç tutulacak soru ID'leri
            
        Returns:
            Örnek sorular listesi
        """
        df = self._load_data()
        
        # Konuya göre filtrele
        filtered = df[df['Ana_Konu'] == topic_name].copy()
        
        # ID'leri hariç tut
        if exclude_ids:
            filtered = filtered[~filtered['Soru_ID'].isin(exclude_ids)]
        
        # Rastgele seç
        if len(filtered) > limit:
            filtered = filtered.sample(n=limit, random_state=42)
        
        # Dict formatına çevir
        questions = []
        for _, row in filtered.iterrows():
            questions.append({
                'Soru_ID': int(row['Soru_ID']),
                'Soru_Metni': str(row['Soru_Metni']),
                'Secenek_A': str(row['Secenek_A']),
                'Secenek_B': str(row['Secenek_B']),
                'Secenek_C': str(row['Secenek_C']),
                'Secenek_D': str(row['Secenek_D']),
                'Dogru_Cevap': str(row['Dogru_Cevap']),
                'Ana_Konu': str(row['Ana_Konu']),
                'Alt_Konu': str(row.get('Alt_Konu', '')),
                'Zorluk': int(row.get('Zorluk', 3))
            })
        
        return questions
    
    def get_all_topics(self) -> List[str]:
        """Tüm konuları listeler"""
        df = self._load_data()
        return sorted(df['Ana_Konu'].unique().tolist())
    
    def get_subtopics(self, topic_name: str) -> List[str]:
        """Belirli bir konunun alt konularını listeler"""
        df = self._load_data()
        filtered = df[df['Ana_Konu'] == topic_name]
        subtopics = filtered['Alt_Konu'].unique().tolist()
        return [s for s in subtopics if s and str(s).strip() != '']
    
    def get_topic_statistics(self) -> Dict:
        """Konu istatistiklerini döndürür"""
        df = self._load_data()
        stats = df.groupby('Ana_Konu').agg({
            'Soru_ID': 'count',
            'Zorluk': 'mean'
        }).rename(columns={
            'Soru_ID': 'question_count',
            'Zorluk': 'avg_difficulty'
        }).to_dict('index')
        
        return stats

