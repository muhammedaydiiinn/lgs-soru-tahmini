# `model` Klasörü

Bu klasör makine öğrenmesi modelleri, eğitim betikleri ve model çıktıları için ayrılmıştır.

Önerilen alt klasör yapısı:
- `training/` : Eğitim scriptleri (`train.py`, `train_experiments/`), hiperparametre konfigürasyonları, eğitim günlükleri.
- `artifacts/` veya `checkpoints/` : Eğitilmiş model ağırlıkları, `*.pth`/`*.h5`/`*.pkl` gibi dosyalar.
- `eval/` : Değerlendirme sonuçları, metrik raporları, görselleştirmeler.

İçerik ve kurallar:
- Model ağırlıkları büyükse (MB/GB boyut), mümkünse `model_registry` veya bulut depolama (S3, GCS) kullanın ve burada küçük referans/manifest dosyası tutun.
- Eğitim yeniden üretilebilir olmalıdır: bir `requirements.txt` veya `environment.yml` ile çalışma ortamını sabitleyin ve bir örnek eğitim komutu (`python train.py --config configs/exp1.yaml`) sağlayın.
- Deneylerin takibi için `weights-and-biases`, `mlflow` veya benzeri bir araç önerilir; deney kayıtları `model/experiments/` altında özetlenebilir.

Kullanım örneği:

1. Eğitim komutunu çalıştırın:

   `python model/training/train.py --config model/training/configs/exp1.yaml`

2. Eğitilmiş ağırlıkları `model/artifacts/` altında bulun.
