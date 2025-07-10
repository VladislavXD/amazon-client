# Как правильно прибавлять просмотры при переходе на страницу товара

## Обзор реализации

Система подсчета просмотров состоит из нескольких компонентов:

### 1. Хуки для работы с просмотрами (`useProductViews.ts`)

#### `useProductPageView(productId)`
Автоматически добавляет просмотр при загрузке страницы товара с задержкой в 1 секунду.

#### `useProductViewTracker(productId)`
Предоставляет функцию `trackView()` для ручного добавления просмотров с защитой от дублирования.

#### `useProductViewsCount(productId)`
Получает актуальное количество просмотров с сервера с кэшированием на 5 минут.

### 2. Логика предотвращения дублирования

- Использует `sessionStorage` для отслеживания просмотренных товаров
- Повторные просмотры одного товара засчитываются только через час
- Ключ в sessionStorage: `product_view_${productId}`

## Использование на странице товара

```tsx
import { useProductPageView } from "../../../hooks/useProductViews";

const Product = ({ initialProduct }: IProductPage) => {
  // Автоматически добавляем просмотр при загрузке страницы
  useProductPageView(initialProduct.id);
  
  // ... остальной код компонента
};
```

## Использование в списке товаров

```tsx
import { useProductViewTracker } from "@/src/hooks/useProductViews";

const ProductItem = ({ product }: { product: IProduct }) => {
  const { trackView } = useProductViewTracker(product.id);

  const handleClick = () => {
    trackView(); // Добавляет просмотр при клике
  };

  return (
    <Link href={`/product/${product.slug}`} onClick={handleClick}>
      {/* ... содержимое карточки товара */}
    </Link>
  );
};
```

## Отображение счетчика просмотров

### Простое отображение
```tsx
<span className="flex items-center gap-1">
  <IoEyeSharp/> 
  <p>{product.viewsCount || 0}</p>
</span>
```

### С обновлением в реальном времени
```tsx
import ProductViewsCount from "./ProductViewsCount";

<ProductViewsCount 
  productId={product.id} 
  initialCount={product.viewsCount || 0}
/>
```

## API endpoints

### Добавить просмотр
```http
POST /products/view/{productId}
Content-Type: application/json

{
  "userId": 123 // опционально
}
```

### Получить количество просмотров
```http
GET /products/views-count/{productId}

Response:
{
  "productId": 1,
  "viewsCount": 156
}
```

## Особенности реализации

### 1. Защита от спама
- Дедупликация на уровне сессии (1 час)
- Дедупликация на уровне сервера для авторизованных пользователей

### 2. Поддержка анонимных пользователей
- Неавторизованные пользователи тоже могут добавлять просмотры
- userId передается как опциональный параметр

### 3. Производительность
- Кэширование запросов на получение количества просмотров
- Отложенная загрузка (1 секунда) для страницы товара
- Минимальное количество запросов к серверу

### 4. Обработка ошибок
- Graceful fallback при ошибках API
- Логирование ошибок в консоль
- Не блокирует основной функционал

## Рекомендации

1. **Используйте `useProductPageView`** для автоматического отслеживания на странице товара
2. **Используйте `useProductViewTracker`** для ручного отслеживания в списках товаров
3. **Используйте `ProductViewsCount`** для отображения счетчика с автообновлением
4. **Не забывайте про fallback значения** для `viewsCount`

## Пример полной интеграции

```tsx
// Страница товара
const ProductPage = ({ initialProduct }) => {
  useProductPageView(initialProduct.id);
  
  return (
    <div>
      <h1>{initialProduct.name}</h1>
      <ProductViewsCount 
        productId={initialProduct.id}
        initialCount={initialProduct.viewsCount}
      />
    </div>
  );
};

// Карточка товара в каталоге
const ProductCard = ({ product }) => {
  const { trackView } = useProductViewTracker(product.id);
  
  return (
    <div>
      <Link href={`/product/${product.slug}`} onClick={trackView}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <div className="flex justify-between">
        <span>${product.price}</span>
        <span className="flex items-center gap-1">
          <IoEyeSharp /> 
          <span>{product.viewsCount || 0}</span>
        </span>
      </div>
    </div>
  );
};
```
