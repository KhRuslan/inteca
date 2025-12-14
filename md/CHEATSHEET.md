# 📝 INTECA - Шпаргалка команд

## 🚀 Основные команды

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Production сборка
npm run build

# Preview production
npm run preview

# Линтинг
npm run lint
```

---

## 🌐 URLs

```
Главная:    http://localhost:5173/
Блог:       http://localhost:5173/blog
Админка:    http://localhost:5173/admin
```

**Пароль админки:** `admin123`

---

## 📁 Где что находится?

```bash
# Изображения
/public/*.jpg, *.png, *.svg

# Компоненты
/src/components/*.tsx

# Страницы
/src/pages/*.tsx

# Конфигурация
.env (создайте сами)

# SQL миграция
supabase-schema.sql

# Документация
*.md файлы в корне
```

---

## 🔧 Быстрые действия

### Изменить цвет сайта

```bash
# Откройте
nano tailwind.config.js

# Измените
'inteca-red': '#DC2626'  // Ваш цвет
```

### Изменить пароль админки

```bash
# Откройте
nano src/pages/Admin.tsx

# Строка 12:
if (password === 'admin123') {  // Измените
```

### Добавить изображение

```bash
# Скопируйте в public
cp ~/Downloads/image.jpg public/

# В админке укажите
/image.jpg
```

### Создать .env файл

```bash
nano .env

# Вставьте:
VITE_SUPABASE_URL=https://ваш-проект.supabase.co
VITE_SUPABASE_ANON_KEY=ваш-ключ
```

---

## 🗄️ Supabase команды

```sql
-- Получить весь контент
SELECT * FROM site_content;

-- Получить все посты
SELECT * FROM blog_posts;

-- Сбросить контент к defaults
UPDATE site_content 
SET data = '{...defaults...}'::jsonb 
WHERE key = 'site_content';

-- Удалить все посты
DELETE FROM blog_posts;

-- Поиск постов
SELECT * FROM blog_posts 
WHERE search_vector @@ to_tsquery('harvard');
```

---

## 🐛 Troubleshooting команды

```bash
# Очистить кэш npm
npm cache clean --force

# Переустановить зависимости
rm -rf node_modules package-lock.json
npm install

# Очистить Vite кэш
rm -rf node_modules/.vite

# Убить процесс на порту 5173
lsof -ti:5173 | xargs kill -9

# Проверить TypeScript ошибки
npx tsc --noEmit

# Форматирование кода
npx prettier --write src/
```

---

## 🔍 Отладка

```bash
# Проверить environment variables
echo $VITE_SUPABASE_URL

# В браузере Console:
console.log(import.meta.env.VITE_SUPABASE_URL)

# Проверить localStorage
localStorage.getItem('inteca_site_content')
localStorage.getItem('inteca_blog_posts')

# Очистить localStorage
localStorage.clear()
```

---

## 📊 React Query DevTools

```
# В браузере (dev mode)
Откройте сайт → Левый нижний угол → React Query иконка

Команды:
- Invalidate - сбросить кэш
- Refetch - перезагрузить данные
- Reset - сбросить состояние
```

---

## 🎨 Tailwind классы (часто используемые)

```css
/* Цвета */
bg-[#DD0000]         /* Красный фон */
text-[#DD0000]       /* Красный текст */
border-[#DD0000]     /* Красная рамка */

/* Размеры */
text-4xl             /* 36px */
text-5xl             /* 48px */
h-32                 /* 128px высота */
w-32                 /* 128px ширина */

/* Spacing */
px-4 py-2            /* Padding */
mx-auto              /* Центрирование */
gap-4                /* Gap в grid/flex */

/* Layout */
grid grid-cols-3     /* Grid 3 колонки */
flex items-center    /* Flex center */
```

---

## 🚀 Deploy команды

```bash
# Vercel
vercel
vercel --prod

# Netlify
netlify deploy
netlify deploy --prod

# Git
git add .
git commit -m "Deploy v1.0.0"
git push origin main
```

---

## 📦 Package management

```bash
# Добавить зависимость
npm install package-name

# Добавить dev зависимость
npm install -D package-name

# Обновить зависимости
npm update

# Проверить устаревшие
npm outdated

# Аудит безопасности
npm audit
npm audit fix
```

---

## 🔄 Git workflow

```bash
# Статус
git status

# Добавить изменения
git add .

# Commit
git commit -m "Update hero section"

# Push
git push

# Создать ветку
git checkout -b feature/new-section

# Merge
git checkout main
git merge feature/new-section
```

---

## 📸 Скриншоты для тестирования

```bash
# Установите playwright
npm install -D @playwright/test

# Создайте тест
# tests/screenshot.spec.ts

# Запустите
npx playwright test
```

---

## 🎯 Быстрые ссылки на документацию

```bash
# Открыть документацию
open START_HERE.md
open QUICK_START.md
open ARCHITECTURE.md
open SUPABASE_SETUP.md

# Или в VS Code
code START_HERE.md
```

---

## 💡 Pro Tips

```bash
# Запуск на другом порту
npm run dev -- --port 3000

# Build с анализом
npm run build -- --debug

# Очистить всё и начать с нуля
rm -rf node_modules dist .vite
npm install
npm run dev

# Проверить production bundle size
npm run build
ls -lh dist/assets/
```

---

## 🎓 Горячие клавиши (в dev mode)

- `r` - Перезапустить сервер
- `u` - Показать server URL
- `o` - Открыть в браузере
- `c` - Очистить console
- `q` - Остановить сервер

---

## 📞 Полезные ссылки

- React Query Devtools: левый нижний угол в браузере
- Supabase Dashboard: https://app.supabase.com
- Tailwind Cheatsheet: https://nerdcave.com/tailwind-cheat-sheet

---

**Сохраните эту шпаргалку в закладки!** 📌

