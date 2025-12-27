# Инструкция: Как очистить кэш контента

Если вы удалили данные из Supabase, но переводы все еще отображаются, нужно очистить кэш в браузере.

## Проблема

Контент кэшируется в двух местах:
1. **localStorage** браузера (ключи: `inteca_site_content_ru`, `inteca_site_content_en`, `inteca_site_content_kz`)
2. **React Query кэш** (в памяти браузера)

## Решение 1: Через консоль браузера (рекомендуется)

1. Откройте сайт
2. Нажмите **F12** (или **Cmd+Option+I** на Mac)
3. Перейдите на вкладку **Console**
4. Вставьте и выполните этот код:

```javascript
// Очистка localStorage для всех языков
localStorage.removeItem('inteca_site_content_ru')
localStorage.removeItem('inteca_site_content_en')
localStorage.removeItem('inteca_site_content_kz')
localStorage.removeItem('inteca_site_content')

// Очистка кэша React Query
if (window.queryClient) {
  window.queryClient.clear()
}

console.log('✅ Кэш очищен! Перезагрузите страницу.')
location.reload()
```

## Решение 2: Через DevTools (ручной способ)

1. Откройте DevTools (**F12**)
2. Перейдите на вкладку **Application** (Chrome) или **Storage** (Firefox)
3. В левой панели найдите **Local Storage**
4. Выберите ваш домен
5. Найдите и удалите следующие ключи:
   - `inteca_site_content_ru`
   - `inteca_site_content_en`
   - `inteca_site_content_kz`
   - `inteca_site_content`
6. Перезагрузите страницу (**F5**)

## Решение 3: Полная очистка браузера

1. Очистите кэш браузера (Ctrl+Shift+Delete)
2. Или используйте режим инкогнито/приватный режим

## После очистки

После очистки кэша сайт будет использовать:
1. **Данные из Supabase** (если они есть)
2. **defaultContent из кода** (если данных в Supabase нет)

## Автоматическая очистка

Теперь приложение автоматически удаляет кэш localStorage, если данных нет в Supabase (код обновлён в `contentService.ts`).





