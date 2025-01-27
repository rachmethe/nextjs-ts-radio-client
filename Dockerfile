# Используйте базовый образ Node.js
FROM node:20

# Установите рабочую директорию
WORKDIR /app

# Скопируйте package.json и package-lock.json
COPY package*.json ./

# Установите зависимости
RUN npm install

# Скопируйте все остальные файлы
COPY . .

EXPOSE 3000

# Постройте проект
RUN npm run build

# Укажите команду для запуска сервера
CMD ["npm", "start"]
