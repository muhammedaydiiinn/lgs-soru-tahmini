# `data` Klasörü

Bu klasör proje verilerini barındırır. Amaç veri kaynaklarını, ham veriyi ve işlenmiş veri üretim adımlarını düzenli tutmaktır.

Alt klasörler:
- `raw/` : Orijinal ham veri dosyaları (çeşitli formatlar — CSV, JSON, Excel, görüntü vs.). Bu dosyalar asla doğrudan değiştirilmemeli; yalnızca okunmalıdır.
- `processed/` : Ham veriden temizleme ve dönüşüm sonrası üretilen analiz/öğrenme setleri. Bu dosyalar model eğitimi ve analiz için kullanılır.

Başvuru ve kurallar:
- Ham veriyi eklerken bir açıklama dosyası (`README` veya `metadata.json`) ekleyin: kaynak, tarih, lisans/izin bilgisi, kısaca açıklama.
- İşlenmiş verinin hangi adımlardan geçtiğini `data/processing_notes.md` veya benzeri bir dosyada dokümante edin (örn. sütun seçimleri, eksik değer stratejisi, etiketleme kuralları).
- Veri dosyası adlandırma önerisi: `yyyy-mm-dd_source_description.(csv|json|zip)` veya `datasetname_v1.csv`.

Gizlilik:
- Kişisel veriler veya gizli bilgiler içeren datasetler varsa, bu verileri paylaşmayın ve gerekli anonimleştirme/maskeleme adımlarını uygulayın.

Örnek akış:
1. Ham veri `data/raw/` içine eklenir.
2. `notebooks/` veya `scripts/` altında yer alan ön işleme kodu çalıştırılır; çıktılar `data/processed/` içine yazılır.
3. `data/processed/` içeriği model eğitiminde kullanılır.
