// Утилиты для работы с событиями просмотров
export const ProductViewsEvents = {
  // Константы для событий
  PRODUCT_VIEW_ADDED: 'product-view-added',
  
  // Диспатч события о добавлении просмотра
  dispatchViewAdded: (productId: number) => {
    const event = new CustomEvent('product-view-added', {
      detail: { productId }
    });
    window.dispatchEvent(event);
  },
  
  // Подписка на события просмотров
  onViewAdded: (callback: (productId: number) => void) => {
    const handleEvent = (event: CustomEvent) => {
      callback(event.detail.productId);
    };
    
    window.addEventListener('product-view-added', handleEvent as EventListener);
    
    // Возвращаем функцию для отписки
    return () => {
      window.removeEventListener('product-view-added', handleEvent as EventListener);
    };
  }
};
