# Messenger

Учебный проект — веб-приложение мессенджера

Стек: Vite + TypeScript + Handlebars + Sass. Тесты — Vitest (+ jsdom).

Интерфейс взят из готового макета: [Figma](https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0-1)

## Функциональность

- Регистрация, вход и выход из системы (cookie-сессия [ya-praktikum API](https://ya-praktikum.tech/api/v2/swagger/#/))
- Настройки профиля: изменение данных, пароля и аватара
- Чаты: список чатов пользователя, создание чата, добавление и удаление участников
- SPA-роутер с историей браузера (кнопки «Назад»/«Вперёд», F5 сохраняет страницу) и проверкой авторизации: неавторизованным доступны только `/` и `/sign-up`

## Страницы

| Маршрут      | Страница                 |
| ------------ | ------------------------ |
| `/`          | Авторизация              |
| `/sign-up`   | Регистрация              |
| `/messenger` | Список чатов и переписка |
| `/settings`  | Настройки пользователя   |
| `/404`       | Ошибка 404               |
| `/500`       | Ошибка 500               |

## Архитектура

- Собственный класс-компонент `Block` (Handlebars-шаблоны, реактивные пропсы, lifecycle-хуки)
- Реактивный store + `connect` для подписки компонентов на состояние
- HTTP-клиент на XHR + Promise (`GET/POST/PUT/DELETE`, query string для GET, JSON/FormData для остальных)
- Слои: форма → сервис → API-клиент → store → connect → UI

## Команды

```bash
npm install     # установка зависимостей
npm run dev     # запуск дев-сервера с HMR (http://localhost:3000)
npm run build   # сборка проекта в dist/
npm run start   # сборка и запуск превью продакшен-сборки (http://localhost:3000)
npm run lint    # prettier + tsc + stylelint + eslint
```

Требуется Node.js версии 22 или выше. Для воспроизводимой установки — `npm ci`.

## Тесты

Тесты написаны на [Vitest](https://vitest.dev/) и лежат рядом с тестируемыми модулями (`*.test.ts`).

```bash
npm test          # watch-режим
npm run test:run  # однократный прогон (CI, precommit)
```

## Деплой

Проект развёрнут на Netlify: https://dapper-snickerdoodle-50ee4d.netlify.app/
