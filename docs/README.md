# `docs` Klasörü

Bu klasör proje ile ilgili daha kalıcı dokümantasyonları barındırır: mimari notları, kullanım kılavuzları, API dokümantasyonu ve karar kayıtları (ADR).

İçerik önerileri:
- `architecture.md` : Projenin genel mimarisi ve bileşen ilişkileri.
- `api.md` : Eğer bir HTTP API varsa uç noktalar ve örnek istek/yanıtlar.
- `adr/` : Architecture Decision Records — alınan önemli mimari kararlar ve gerekçeleri.
- `setup.md` : Ortam, deploy ve üretimle ilgili notlar.

Dokümantasyon araçları:
- İsteğe bağlı olarak `mkdocs` veya `Sphinx` kullanarak statik dokümantasyon oluşturabilirsiniz. Örnek kurulum için `pip install mkdocs` ve `mkdocs serve`.

Versiyonlama ve katkı:
- Dokümantasyon değişiklikleri için PR açın ve `docs/` içinde yapılan değişikliklerin kısa özetini açıklayın.
