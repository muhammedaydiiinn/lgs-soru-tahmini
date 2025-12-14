# Veritabanı Bilgileri

## Kullanılan Veritabanı

### PostgreSQL (Ana Veritabanı)
- **Docker ile:** PostgreSQL 15 kullanılıyor
- **Kullanım:** Django ORM ile tüm modeller (User, TopicAnalysis, Question)
- **Bağlantı:** `postgresql://lgs_user:lgs_password@db:5432/lgs_db`

### SQLite (Fallback)
- **Kullanım:** Development ortamında DATABASE_URL yoksa otomatik olarak SQLite kullanılır
- **Dosya:** `backend/db.sqlite3`

### MongoDB (Gelecek için)
- **Durum:** Şu anda kullanılmıyor, sadece ayarlar hazır
- **Kullanım:** Gelecekte büyük veri veya log kayıtları için kullanılabilir
- **Bağlantı:** `mongodb://localhost:27017/`

## Veritabanı Yapısı

### PostgreSQL Tabloları

1. **accounts_customuser** - Kullanıcılar
   - id, username, email, password, usage_quota, subscription_plan, vb.

2. **model_service_topicanalysis** - Konu Analizleri
   - id, user_id, subject, topic_name, relevance_score, user_proficiency, recommendation, created_at

3. **model_service_question** - Sorular
   - id, user_id, subject, topic_name, question_text, option_a/b/c/d, correct_answer, difficulty, current_event_context, explanation, created_at

4. **authtoken_token** - API Token'ları
   - key, user_id, created

## Docker ile Kullanım

```bash
# PostgreSQL container'ı başlat
docker-compose up -d db

# Migration'ları çalıştır
make migrate

# Database shell'e gir
docker-compose exec db psql -U lgs_user -d lgs_db
```

## Manuel Kullanım (SQLite)

Eğer Docker kullanmıyorsanız, otomatik olarak SQLite kullanılır:

```bash
cd backend
python manage.py migrate
python manage.py runserver
```

## Veritabanı Yedekleme

### PostgreSQL Yedekleme
```bash
# Yedek al
docker-compose exec db pg_dump -U lgs_user lgs_db > backup.sql

# Yedekten geri yükle
docker-compose exec -T db psql -U lgs_user lgs_db < backup.sql
```

### SQLite Yedekleme
```bash
# Sadece dosyayı kopyala
cp backend/db.sqlite3 backend/db.sqlite3.backup
```

## Veritabanı Temizleme

```bash
# Tüm verileri sil (DİKKAT: Tüm veriler silinir!)
docker-compose down -v
docker-compose up -d
make migrate
```

