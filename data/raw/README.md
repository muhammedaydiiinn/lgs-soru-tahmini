# `data/raw` Klasörü

Bu klasörün amacı orijinal, ham veri kaynaklarını saklamaktır. Ham veri üzerinde manuel değişiklik yapılmamalıdır.

İçerik:
- Ham CSV/JSON/Excel dosyaları, görüntü arşivleri, ham metin dosyaları veya üçüncü taraf arşivleri (`.zip`, `.tar.gz`).
- Kaynağı ve alma tarihini açıklayan kısa bir `metadata.json` veya `README` dosyası ekleyin.

Kurallar:
- Ham veri dosyaları yalnızca okunur; ön işleme adımları sonucu oluşan dosyalar `data/processed/` içine yazılmalıdır.
- Eğer ham veride hassas bilgi varsa, önce anonimleştirme yapılmalı veya erişim kısıtlanmalıdır.

Örnek dosya adları:
- `lgs_questions_2018_2025.zip`
- `raw_ocr_scans_2025-06-01/`
