### `README.md`

# Neural Network API

API для работы с текстовыми нейросетями. Поддерживает несколько моделей, внутреннюю валюту для учета расхода токенов и стриминг ответов.

## Технический стек
- Node.js
- TypeScript
- Express
- PostgreSQL
- Server-Sent Events (SSE) для стриминга
- Swagger для документации

## Установка и запуск

### Шаг 1: Клонируйте репозиторий
```bash
git clone https://github.com/MyHeartRaces/NN-API
cd repository
```

### Шаг 2: Установите зависимости
```bash
npm install
```

### Шаг 3: Настройте окружение

Создайте файл `.env` и добавьте в него необходимые переменные:
```plaintext
PORT=5000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_db_name
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_api_key
```

### Шаг 4: Запустите миграции
Запустите миграции для создания необходимых таблиц в базе данных.

```bash
npm run typeorm migration:run
```

### Шаг 5: Запуск сервера
Для запуска сервера в режиме разработки:
```bash
npm run dev
```

Для запуска сервера в режиме продакшн:
```bash
npm run build
npm start
```

### Документация API

Документация API доступна по адресу: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)

## Тестирование API
Для интерактивного тестирования вы можете использовать Swagger UI или Postman.

- Откройте Swagger UI: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)
- Авторизуйтесь через JWT токен, полученный после логина, для доступа к защищенным маршрутам.

## Примеры запросов

### Регистрация пользователя
`POST /api/auth/register`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Логин пользователя
`POST /api/auth/login`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Получение баланса
`GET /api/balance`

**Заголовок Authorization:** `Bearer {ваш_JWT_токен}`

### Обновление баланса (для администраторов)
`POST /api/balance/update`

**Заголовок Authorization:** `Bearer {ваш_JWT_токен}`

```json
{
  "userId": "user_id",
  "amount": 100
}
```

### Генерация текста
`POST /api/generate`

**Заголовок Authorization:** `Bearer {ваш_JWT_токен}`

```json
{
  "model": "gpt-4",
  "prompt": "Once upon a time"
}
```
