# Автоматическое обновление просмотров без перезагрузки страницы

## Как это работает

Система автоматического обновления просмотров использует несколько механизмов:

### 1. **Инвалидация кэша React Query**
При добавлении просмотра автоматически инвалидируется кэш для:
- Конкретного товара `['product-views-count', productId]`
- Общих запросов товаров `['products']`
- Запросов каталога `['get categories']`

### 2. **Кастомные события (Custom Events)**
```typescript
// Диспатч события о добавлении просмотра
ProductViewsEvents.dispatchViewAdded(productId)

// Подписка на события
ProductViewsEvents.onViewAdded((productId) => {
  // Обновляем UI
})
```

### 3. **Оптимистичные обновления**
Счетчик увеличивается мгновенно, не дожидаясь ответа сервера:
```typescript
const { viewsCount, isLoading } = useOptimisticViewsCount(productId, initialCount);
```

## Компоненты системы

### `useOptimisticViewsCount` - Главный хук
```typescript
export const useOptimisticViewsCount = (productId: number, initialCount: number = 0) => {
  // Оптимистично увеличивает счетчик
  // Синхронизируется с сервером
  // Подписывается на события просмотров
}
```

### `ProductViewsEvents` - Система событий
```typescript
export const ProductViewsEvents = {
  dispatchViewAdded: (productId: number) => void,
  onViewAdded: (callback: (productId: number) => void) => unsubscribe
}
```

### `ProductViewsCount` - Компонент счетчика
```tsx
<ProductViewsCount 
  productId={product.id} 
  initialCount={product.viewsCount || 0}
/>
```

## Настройки обновления

### Частота обновлений
```typescript
// В useProductViewsCount
staleTime: 2 * 60 * 1000, // 2 минуты
refetchOnWindowFocus: true, // При фокусе окна
refetchInterval: 30 * 1000, // Каждые 30 секунд
```

### Задержки для синхронизации
```typescript
// После добавления просмотра
setTimeout(() => {
  queryClient.invalidateQueries({ 
    queryKey: ['product-views-count', productId] 
  })
}, 100) // 100ms задержка

// Для обновления UI
setTimeout(() => {
  refetch();
}, 300); // 300ms задержка
```

## Использование

### 1. В компоненте товара
```tsx
import { ProductViewsCount } from './ProductViewsCount';

const ProductItem = ({ product }) => {
  return (
    <div>
      {/* Другое содержимое */}
      <ProductViewsCount 
        productId={product.id} 
        initialCount={product.viewsCount || 0}
      />
    </div>
  );
};
```

### 2. На странице товара
```tsx
import { useProductPageView } from '../../../hooks/useProductViews';

const ProductPage = ({ initialProduct }) => {
  // Автоматически добавляет просмотр и обновляет все счетчики
  useProductPageView(initialProduct.id);
  
  return (
    <div>
      {/* Содержимое страницы */}
    </div>
  );
};
```

## Что происходит при переходе на товар и обратно

### Шаг 1: Пользователь переходит на страницу товара
1. `useProductPageView` автоматически добавляет просмотр через 1 секунду
2. При успешном добавлении диспатчится событие `ProductViewsEvents.dispatchViewAdded(productId)`
3. Инвалидируется кэш React Query

### Шаг 2: Пользователь возвращается в каталог
1. Компонент `ProductViewsCount` подписан на события просмотров
2. При получении события для своего `productId` мгновенно увеличивает счетчик (оптимистично)
3. Через 300ms делает запрос к серверу для получения актуальных данных
4. Обновляет UI с реальными данными

### Результат
✅ Счетчик обновляется мгновенно (оптимистично)  
✅ Через 300ms синхронизируется с сервером  
✅ Работает без перезагрузки страницы  
✅ Работает для всех экземпляров компонента  

## Преимущества подхода

1. **Мгновенная обратная связь** - пользователь сразу видит изменения
2. **Надежность** - данные синхронизируются с сервером
3. **Производительность** - минимум запросов к API
4. **Масштабируемость** - работает для любого количества товаров на странице
5. **Отказоустойчивость** - graceful fallback при ошибках

## Отладка

Для отладки можно использовать:
```typescript
// Логирование событий
ProductViewsEvents.onViewAdded((productId) => {
  console.log(`Просмотр добавлен для товара ${productId}`);
});

// Мониторинг кэша React Query
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();
console.log('Текущий кэш:', queryClient.getQueryCache());
```
