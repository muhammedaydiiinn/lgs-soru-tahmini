# LGS Soru Tahmini — Backend (Django)

**Özet:** Bu dizin, projenin Django backend uygulamasını barındırır. Kullanıcı verilerini ve tahminleri yönetmek için Django kullanılır. Veritabanı olarak karma bir yapı (SQLite + MongoDB) desteklenir.

**Gereksinimler:**
- Python 3.10 veya üzeri
- `git`
- `virtualenv` veya `venv` desteği
- (Opsiyonel) MongoDB (Lokalde veya Atlas üzerinde çalışan)

**Hızlı Başlangıç (macOS / zsh)**

1. `backend` dizinine gidin:
   ```bash
   cd backend
   ```

2. Sanal ortam oluşturun ve etkinleştirin:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Bağımlılıkları yükleyin:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. Veritabanı Ayarları:
   - **SQLite (Varsayılan):** Kullanıcı hesapları (Auth) ve ilişkisel veriler için kullanılır.
   - **MongoDB (Opsiyonel):** Büyük veri setleri veya loglama işlemleri için `pymongo` ile yapılandırılmıştır.

   Eğer MongoDB kullanacaksanız `.env` dosyasına şu değişkenleri ekleyin:
   ```env
   MONGODB_URI=mongodb://localhost:27017/
   MONGODB_DB_NAME=lgs_tahmin_db
   ```

5. Veritabanı göçlerini uygulayın:
   ```bash
   python manage.py migrate
   ```

6. (Opsiyonel) Yönetici hesabı oluşturun:
   ```bash
   python manage.py createsuperuser
   ```

7. Geliştirme sunucusunu başlatın:
   ```bash
   python manage.py runserver
   ```

8. Tarayıcıda `http://127.0.0.1:8000/` adresini açın.

**Ortam Değişkenleri ve Ayarlar**
- Gizli anahtarlar veya üretim ayarları için `backend/lgs_project/settings.py` dosyasını inceleyin. `.env` veya `python-dotenv` kullanıyorsanız ortam dosyasını proje köküne yerleştirin ve uygun şekilde yükleyin.

**Veritabanı Yapısı**
- **Relational (SQLite):** `CustomUser`, `Token`, `Session` gibi kimlik doğrulama verileri.
- **NoSQL (MongoDB):** Tahmin geçmişi ve büyük veri analizleri için konfigüre edilebilir (`api/views.py` içinde `pymongo` kullanılarak).

**Model Servisi**
- `model_service` uygulaması makine öğrenmesi kodlarını barındırır. 

**Testler**
- Mevcut testleri çalıştırmak için:
  ```bash
  python manage.py test
  ```

**Sorun Giderme**
- `ModuleNotFoundError`: Sanal ortam aktif mi ve `pip install -r requirements.txt` çalıştırıldı mı kontrol edin.
- Migration hataları: `python manage.py makemigrations` sonra `migrate` deneyin.
