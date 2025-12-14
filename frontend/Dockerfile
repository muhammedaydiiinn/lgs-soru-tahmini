FROM node:20-alpine

WORKDIR /app

# Package dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kodunu kopyala
COPY . .

# Port
EXPOSE 5173

# Development server'ı çalıştır (foreground'da kalması için)
CMD ["sh", "-c", "npm run dev"]

