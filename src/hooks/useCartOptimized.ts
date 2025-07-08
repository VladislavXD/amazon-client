import { useCallback, useMemo } from 'react';
import { useTypedSelector } from './useTypedSelector';
import { useActions } from './useActions';

// Оптимизированный хук для корзины с мемоизацией
export const useCart = () => {
  const { items } = useTypedSelector(state => state.cart);
  const { addToCart, removeFromCart, changeQuantity, reset } = useActions();

  // Мемоизация общей суммы
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  // Мемоизация количества товаров
  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  // Мемоизация функций для предотвращения ре-рендеров
  const handleAddToCart = useCallback((product: any) => {
    addToCart({ product, quantity: 1, price: product.price });
  }, [addToCart]);

  const handleRemoveFromCart = useCallback((id: number) => {
    removeFromCart({ id });
  }, [removeFromCart]);

  const handleChangeQuantity = useCallback((id: number, type: 'plus' | 'minus') => {
    changeQuantity({ id, type });
  }, [changeQuantity]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return {
    items,
    total,
    totalItems,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    changeQuantity: handleChangeQuantity,
    reset: handleReset,
  };
};

export default useCart;
