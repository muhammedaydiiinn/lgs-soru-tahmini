.PHONY: help build up down logs migrate shell test clean

help:
	@echo "LGS Soru Tahmini - Docker Komutları"
	@echo ""
	@echo "Kullanım:"
	@echo "  make build      - Docker image'larını build et"
	@echo "  make up         - Servisleri başlat"
	@echo "  make down       - Servisleri durdur"
	@echo "  make logs       - Logları görüntüle"
	@echo "  make migrate    - Database migration'ları çalıştır"
	@echo "  make shell      - Backend shell'e gir"
	@echo "  make superuser  - Superuser oluştur"
	@echo "  make clean      - Tüm container ve volume'ları temizle"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

migrate:
	docker-compose exec backend python manage.py migrate

shell:
	docker-compose exec backend python manage.py shell

superuser:
	docker-compose exec backend python manage.py createsuperuser

test:
	docker-compose exec backend python manage.py test

clean:
	docker-compose down -v
	docker system prune -f

