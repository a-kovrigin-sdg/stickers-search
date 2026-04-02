# MiniSearch Stickers Demo

Небольшое React-приложение для демонстрации возможностей `minisearch` на наборе стикеров. Данные разделены на два файла:

- `src/data/stickers.json` — карточки стикеров
- `src/data/tags.json` — поисковые теги и синонимы

## Быстрый старт

```bash
npm install
npm run dev
```

## Что можно настраивать

- поля индекса (`name`, `description`, `tagsText`)
- `storeFields`
- `prefix`, `fuzzy`, `combineWith`
- `boost` для имени и тегов

Если убрать все поля индекса, поиск будет выключен — интерфейс покажет предупреждение.
