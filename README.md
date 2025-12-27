# INTECA Website

Современный веб-сайт для INTECA - Intelligence Education Ambitions с блогом и CMS-админкой.

## ✨ Основные возможности

- 🎨 **Динамический контент** - все редактируется через админку
- 🌍 **Мультиязычность** - 3 языка (RU, EN, KZ)
- 📝 **Блог** - полнофункциональная система с поиском и тегами
- 🔧 **Админ-панель** - управление сайтом и блогом
- ⚡ **Мгновенная загрузка** - React Query кэширование
- 💾 **Supabase** - централизованное хранилище данных
- 📱 **Мобильная адаптация** - полностью responsive дизайн (320px-1920px+)
- 🔌 **Offline режим** - работает без интернета

## 🚀 Быстрый старт

### Минимальная установка (без Supabase)

```bash
npm install
npm run dev
```

Откройте: `http://localhost:5173`

## 🛠️ Технологии

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM v6
- **State:** React Query (TanStack Query)
- **Backend:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage + localStorage fallback

## Установка и запуск

```bash
# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev

# Собрать для production
npm run build

# Предпросмотр production сборки
npm run preview
```

## Страницы

- **Главная** (`/`) - Основная страница с информацией о INTECA
- **Блог** (`/blog`) - Страница со всеми статьями блога
- **Пост блога** (`/blog/:id`) - Отдельная страница статьи
- **Админ-панель** (`/admin`) - Управление контентом и блогом (пароль: admin123)

## Структура проекта

```
inteca/
├── src/
│   ├── components/             # UI компоненты
│   │   ├── TopBar.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProgramBenefits.tsx
│   │   ├── WhoProgramFor.tsx
│   │   ├── CaseBasedLearning.tsx
│   │   ├── KeyBenefits.tsx
│   │   ├── Founder.tsx
│   │   ├── CTABanner.tsx
│   │   └── Footer.tsx
│   ├── pages/                  # Страницы
│   │   ├── Home.tsx           # Главная страница
│   │   ├── Blog.tsx           # Список постов блога
│   │   ├── BlogPost.tsx       # Отдельный пост
│   │   └── Admin.tsx          # Админ-панель
│   ├── contexts/              # Context API
│   │   ├── ContentContext.tsx # Управление контентом сайта
│   │   └── BlogContext.tsx    # Управление блогом
│   ├── types/                 # TypeScript типы
│   │   ├── content.ts         # Типы контента
│   │   └── blog.ts            # Типы блога
│   ├── App.tsx                # Роутинг
│   ├── main.tsx               # Entry point
│   └── index.css              # Глобальные стили
├── public/                    # Статические файлы
│   ├── hero-section.png
│   ├── founder.jpg
│   ├── case-based.jpeg
│   ├── inTECA logo black.svg
│   └── inTECA logo white.svg
├── index.html
└── package.json
```

## Особенности

### Основной сайт
- ✅ Полностью адаптивный дизайн
- ✅ Динамический контент через Context API
- ✅ Шрифты: Montserrat для заголовков, Open Sans/Roboto для текста
- ✅ Цветовая схема: черный, белый, серый, красный (#DC2626)

### Блог
- ✅ Список всех постов с превью
- ✅ Отдельная страница для каждой статьи
- ✅ Поиск по заголовку и описанию
- ✅ Фильтрация по тегам
- ✅ Избранные посты (Featured)
- ✅ Похожие статьи на странице поста

### Админ-панель
- ✅ Редактирование всего контента сайта
- ✅ Управление постами блога (создание, редактирование, удаление)
- ✅ Авторизация через Supabase
- ✅ Автосохранение в localStorage
- ✅ Возможность сброса к исходному состоянию

## Использование админ-панели

1. Перейдите на `/admin`
2. Введите почту и пароль
3. Выберите секцию для редактирования в боковом меню
4. Для блога: создавайте, редактируйте или удаляйте посты
5. Изменения сохраняются автоматически

Подробная инструкция в файле `ADMIN_GUIDE.md`





