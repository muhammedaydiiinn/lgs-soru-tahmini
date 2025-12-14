# .env Dosyası Kurulumu

## Örnek .env Dosyası

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True

# Database (PostgreSQL - Docker için)
DATABASE_URL=postgresql://lgs_user:lgs_password@db:5432/lgs_db

# MongoDB (Opsiyonel)
MONGODB_URI=mongodb://localhost:27017/
MONGODB_DB_NAME=lgs_tahmin_db

# LLM Configuration
# ÖNEMLİ: Tırnak işareti KULLANMAYIN
LLM_API_URL=http://localhost:1234/v1
LLM_MODEL=openai/gpt-oss-20b
LLM_TIMEOUT=60

# News API
NEWS_API_KEY=6eb7fdae29aa41b19db65765810271e5

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

## Önemli Notlar

### 1. Tırnak İşaretleri
`.env` dosyasında değerlerin etrafında **tırnak işareti kullanmayın**. Docker Compose ve Python otomatik olarak işler.

❌ **Yanlış:**
```env
LLM_API_URL="http://localhost:1234/v1"
LLM_MODEL="openai/gpt-oss-20b"
```

✅ **Doğru:**
```env
LLM_API_URL=http://localhost:1234/v1
LLM_MODEL=openai/gpt-oss-20b
```

### 2. LLM API URL
- **Docker dışında çalışıyorsa:** `http://localhost:1234/v1`
- **Docker içinden host'a erişim:** `http://host.docker.internal:1234/v1`

### 3. LLM Model Adı
Model adı LLM servisinizin desteklediği formatta olmalı. Örnekler:
- `openai/gpt-oss-20b`
- `llama3.2`
- `mistral-7b`

### 4. News API Key
News API key'inizi [newsapi.org](https://newsapi.org) adresinden alabilirsiniz.

## Docker ile Kullanım

Docker Compose `.env` dosyasını otomatik olarak okur:

```bash
# .env dosyası proje root'unda olmalı
docker-compose up -d
```

## Manuel Kullanım

Python uygulaması `.env` dosyasını `python-dotenv` ile okur:

```python
from dotenv import load_dotenv
import os

load_dotenv()
llm_url = os.getenv('LLM_API_URL')
```

