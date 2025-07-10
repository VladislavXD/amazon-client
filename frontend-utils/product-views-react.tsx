import React, { useState, useEffect, ReactNode } from 'react';
import { ProductViewsService } from './product-views.service';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  images: string[];
  viewsCount?: number;
  viewedAt?: string;
}

// Хук для работы с просмотрами товаров
export const useProductViews = (baseUrl: string) => {
  const [viewsService] = useState(() => new ProductViewsService(baseUrl));
  
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPopularProducts = async (options = {}) => {
    setIsLoading(true);
    try {
      const products = await viewsService.getPopularProducts(options);
      setPopularProducts(products);
    } catch (error) {
      console.error('Failed to load popular products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRecentlyViewed = async (limit = 10) => {
    setIsLoading(true);
    try {
      const products = await viewsService.getRecentlyViewed(limit);
      setRecentlyViewed(products);
    } catch (error) {
      console.error('Failed to load recently viewed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    viewsService,
    popularProducts,
    recentlyViewed,
    isLoading,
    loadPopularProducts,
    loadRecentlyViewed
  };
};

// Компонент для автоматического отслеживания просмотра
export const ProductViewTracker: React.FC<{
  productId: number;
  children: ReactNode;
  baseUrl: string;
  delay?: number; // задержка перед добавлением просмотра в мс
}> = ({ productId, children, baseUrl, delay = 3000 }) => {
  const { viewsService } = useProductViews(baseUrl);

  useEffect(() => {
    if (productId) {
      // Добавляем просмотр с задержкой
      const timer = setTimeout(() => {
        viewsService.addView(productId);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [productId, viewsService, delay]);

  return <>{children}</>;
};

// Компонент для отображения популярных товаров
export const PopularProductsList: React.FC<{
  baseUrl: string;
  limit?: number;
  timeRange?: 'day' | 'week' | 'month' | 'all';
  renderProduct: (product: Product) => ReactNode;
}> = ({ baseUrl, limit = 10, timeRange = 'week', renderProduct }) => {
  const { popularProducts, isLoading, loadPopularProducts } = useProductViews(baseUrl);

  useEffect(() => {
    loadPopularProducts({ limit, timeRange });
  }, [limit, timeRange]);

  if (isLoading) {
    return <div>Загрузка популярных товаров...</div>;
  }

  return (
    <div className="popular-products">
      <h2>Популярные товары</h2>
      <div className="products-grid">
        {popularProducts.map(product => (
          <div key={product.id}>
            {renderProduct(product)}
            <div className="views-count">
              👁️ {product.viewsCount} просмотров
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Компонент для отображения недавно просмотренных товаров
export const RecentlyViewedList: React.FC<{
  baseUrl: string;
  limit?: number;
  renderProduct: (product: Product) => ReactNode;
}> = ({ baseUrl, limit = 10, renderProduct }) => {
  const { recentlyViewed, isLoading, loadRecentlyViewed } = useProductViews(baseUrl);

  useEffect(() => {
    loadRecentlyViewed(limit);
  }, [limit]);

  if (isLoading) {
    return <div>Загрузка недавно просмотренных...</div>;
  }

  if (recentlyViewed.length === 0) {
    return <div>Нет недавно просмотренных товаров</div>;
  }

  return (
    <div className="recently-viewed">
      <h2>Недавно просмотренные</h2>
      <div className="products-grid">
        {recentlyViewed.map(product => (
          <div key={product.id}>
            {renderProduct(product)}
            <div className="viewed-at">
              Просмотрено: {new Date(product.viewedAt!).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Хук для отслеживания просмотра с дебаунсом
export const useViewTracker = (baseUrl: string, delay = 3000) => {
  const [viewsService] = useState(() => new ProductViewsService(baseUrl));
  const [timeouts] = useState(new Map<number, NodeJS.Timeout>());

  const trackView = (productId: number) => {
    // Отменяем предыдущий таймер для этого товара
    if (timeouts.has(productId)) {
      clearTimeout(timeouts.get(productId)!);
    }

    // Устанавливаем новый таймер
    const timer = setTimeout(() => {
      viewsService.addView(productId);
      timeouts.delete(productId);
    }, delay);

    timeouts.set(productId, timer);
  };

  const cancelView = (productId: number) => {
    if (timeouts.has(productId)) {
      clearTimeout(timeouts.get(productId)!);
      timeouts.delete(productId);
    }
  };

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      timeouts.forEach(timer => clearTimeout(timer));
      timeouts.clear();
    };
  }, [timeouts]);

  return { trackView, cancelView };
};
