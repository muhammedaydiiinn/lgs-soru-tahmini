# LGS Soru Tahmini — Backend (Django)

**Özet:** Bu dizin, projenin Django backend uygulamasını barındırır. Aşağıda geliştirme ortamında projeyi çalıştırmak için gerekli adımlar verilmektedir.

**Gereksinimler:**
- Python 3.10 veya üzeri
- `git`
- `virtualenv` veya `venv` desteği

**Hızlı Başlangıç (macOS / zsh)**

1. `backend` dizinine gidin:

2. Sanal ortam oluşturun ve etkinleştirin:

   `python3 -m venv .venv`
   `source .venv/bin/activate`

3. Bağımlılıkları yükleyin (lokal `requirements.txt` kullanılır):

   `pip install --upgrade pip`
   `pip install -r requirements.txt`

4. Veritabanı göçlerini uygulayın (varsayılan SQLite kullanılır):

   `python manage.py migrate`

5. (Opsiyonel) Yönetici hesabı oluşturun:

   `python manage.py createsuperuser`

6. Geliştirme sunucusunu başlatın:

   `python manage.py runserver`

   - Farklı bir port kullanmak için: `python manage.py runserver 8001`

7. Tarayıcıda `http://127.0.0.1:8000/` adresini açın.

**Ortam Değişkenleri ve Ayarlar**
- Gizli anahtarlar veya üretim ayarları için `backend/lgs_project/settings.py` dosyasını inceleyin. `.env` veya `python-dotenv` kullanıyorsanız ortam dosyasını proje köküne yerleştirin ve uygun şekilde yükleyin.

**Veritabanı**
- Varsayılan olarak `db.sqlite3` kullanılır. Farklı bir DB (Postgres, MySQL) kullanacaksanız `backend/lgs_project/settings.py` içindeki `DATABASES` ayarlarını ve gerekli sürücüleri (`psycopg2-binary` vs.) ekleyin.

**Model Servisi**
- `model_service` uygulaması makine öğrenmesi kodlarını barındırır. Eğer modelleri yeniden eğitmek veya çalıştırmak isterseniz, ek bağımlılıklar gerekebilir (ör. TensorFlow veya PyTorch). Bu paketleri yalnızca ihtiyaç halinde `requirements.txt`'e ekleyin.

**Testler**
- Mevcut testleri çalıştırmak için:

  `python manage.py test`

**Yayına Alma Notları (kısa)**
- Üretim için `DEBUG=False` yapın ve `ALLOWED_HOSTS` değerlerini ayarlayın.
- Gunicorn + ters proxy (nginx) kombinasyonu yaygın bir yaklaşımdır. `gunicorn` `requirements.txt`'e eklidir.

**Sorun Giderme**
- `ModuleNotFoundError`: Sanal ortam aktif mi ve `pip install -r requirements.txt` çalıştırıldı mı kontrol edin.
- Migration hataları: `python manage.py makemigrations` sonra `migrate` deneyin.

**Ek Bilgi**
- Proje kökünde ayrıca bir `requirements.txt` bulunur; ortak bağımlılıklar oraya eklenmiş olabilir. `backend/requirements.txt` backend'e özgü paketleri içerir.
