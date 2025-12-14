# Docker Kurulumu

## Gereksinimler

- Docker
- Docker Compose
- LLM servisi çalışıyor olmalı (http://localhost:1234/v1)

## Kurulum

1. `.env` dosyasını oluşturun:
```bash
cp .env.example .env
```

2. `.env` dosyasını oluşturun ve düzenleyin:
```env
# LLM Configuration (Tırnak işareti KULLANMAYIN)
LLM_API_URL=http://host.docker.internal:1234/v1
LLM_MODEL=openai/gpt-oss-20b
LLM_TIMEOUT=60

# News API
NEWS_API_KEY=your-news-api-key-here

# MongoDB (Opsiyonel)
MONGODB_URI=mongodb://localhost:27017/
MONGODB_DB_NAME=lgs_tahmin_db
```

**ÖNEMLİ:** `.env` dosyasında değerlerin etrafında tırnak işareti kullanmayın. Docker Compose otomatik olarak işler.

3. Docker Compose ile başlatın:
```bash
docker-compose up -d
```

4. Backend migration'ları çalıştırın (ilk kez):
```bash
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

## Servisler

- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:5173
- **Database**: localhost:5432

## Komutlar

```bash
# Servisleri başlat
docker-compose up -d

# Logları görüntüle
docker-compose logs -f

# Servisleri durdur
docker-compose down

# Servisleri yeniden build et
docker-compose up -d --build

# Backend shell
docker-compose exec backend python manage.py shell

# Database shell
docker-compose exec db psql -U lgs_user -d lgs_db
```

## Sorun Giderme

### LLM bağlantı hatası
Eğer LLM servisi host'ta çalışıyorsa, `.env` dosyasında:
```
LLM_API_URL=http://host.docker.internal:1234/v1
```

Eğer LLM servisi de Docker'da çalışıyorsa, `docker-compose.yml`'e LLM servisini ekleyin.

### Port çakışması
Eğer portlar kullanılıyorsa, `docker-compose.yml` dosyasındaki port numaralarını değiştirin.

