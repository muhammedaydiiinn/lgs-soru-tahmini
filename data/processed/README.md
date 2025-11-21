# `data/processed` Klasörü

Bu klasör, ham veriden üretilmiş, eğitim ve analiz için hazır veri setlerini içerir.

İçerik örnekleri:
- Temizlenmiş ve birleştirilmiş CSV/Parquet dosyaları (`train.csv`, `test.csv`, `features.parquet`).
- Etiketlenmiş veri setleri ve veri bölme (train/val/test) çıktıları.
- Özellik mühendisliği çıktıları (ör. `features_v1.csv`) ve ölçekleyici/encoder objeler (pickle dosyaları) — eğer saklanıyorsa `models/` veya `artifacts/` altında organize edin.

Dokümantasyon:
- Her işlenmiş dosya için kısa bir açıklama (hangi ham dosyadan geldiği, hangi dönüşümlerin uygulandığı, oluşturulma tarihi) ekleyin. Örnek: `train_v1_readme.md`.

Versiyonlama:
- İşlenmiş veri setlerinde sürüm numarası kullanın (`v1`, `v2`) ve eski sürümleri gerektiğinde saklayın.
