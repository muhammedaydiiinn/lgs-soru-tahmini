# `notebooks` Klasörü

Bu klasörde proje ile ilgili Jupyter notebook'ları bulunur. Notebooks hem veri keşfi, ön işleme adımlarını gösterir hem de model prototipleme/analiz iş akışlarını içerir.

Kurallar ve öneriler:
- Notebook adlandırma: `NN_description.ipynb` biçiminde sıraya göre numaralandırma ve kısa açıklama kullanın. Örnek: `01_data_exploration.ipynb`, `02_feature_engineering.ipynb`.
- Her notebook'un başında amacını ve çalıştırma gereksinimlerini (kullanılan veri dosyaları, gerekli paketler) belirtin.
- Uzun hesaplama adımları için çıktıların kaydedilmesi veya hücrelerin atlanması için `# %%` veya `papermill` kullanılabilir.
- Paylaşırken gizli anahtar veya hassas bilgi içeren hücreleri temizleyin.

Çalıştırma:
- Sanal ortamı aktif ettikten sonra Jupyter çalıştırın:

  `jupyter lab` veya `jupyter notebook`

- Notebooks, `data/raw` ve `data/processed` yollarına göre yazılmışsa path'leri doğru ayarlayın (örn. `../data/processed/train.csv`).
