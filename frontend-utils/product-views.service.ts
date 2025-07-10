// Утилита для работы с просмотрами товаров на фронтенде

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  images: string[];
  viewsCount?: number;
  viewedAt?: string;
}

interface ViewsServiceOptions {
  limit?: number;
  timeRange?: 'day' | 'week' | 'month' | 'all';
}

interface ViewsService {
  // Добавить просмотр товара
  addView: (productId: number) => Promise<void>;
  
  // Получить популярные товары
  getPopularProducts: (options?: ViewsServiceOptions) => Promise<Product[]>;
  
  // Получить недавно просмотренные товары
  getRecentlyViewed: (limit?: number) => Promise<Product[]>;
  
  // Получить количество просмотров
  getViewsCount: (productId: number) => Promise<{ viewsCount: number }>;
}

// Пример реализации для фронтенда
export class ProductViewsService implements ViewsService {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async addView(productId: number): Promise<void> {
    try {
      const token = localStorage.getItem('accessToken');
      await fetch(`${this.baseUrl}/products/view/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
    } catch (error) {
      console.error('Failed to add view:', error);
    }
  }

  async getPopularProducts(options: ViewsServiceOptions = {}): Promise<Product[]> {
    const { limit = 10, timeRange = 'all' } = options;
    const params = new URLSearchParams({
      limit: limit.toString(),
      timeRange
    });

    const response = await fetch(`${this.baseUrl}/products/popular/list?${params}`);
    return response.json();
  }

  async getRecentlyViewed(limit = 10): Promise<Product[]> {
    const token = localStorage.getItem('accessToken');
    if (!token) return [];

    const params = new URLSearchParams({ limit: limit.toString() });
    const response = await fetch(`${this.baseUrl}/products/recently-viewed/list?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }

  async getViewsCount(productId: number): Promise<{ viewsCount: number }> {
    const response = await fetch(`${this.baseUrl}/products/views-count/${productId}`);
    return response.json();
  }
}

// Утилиты для работы с просмотрами
export const ProductViewsUtils = {
  // Создать экземпляр сервиса
  createService: (baseUrl: string) => new ProductViewsService(baseUrl),
  
  // Дебаунс функция для предотвращения слишком частых вызовов
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): T => {
    let timeout: NodeJS.Timeout | null = null;
    return ((...args: any[]) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    }) as T;
  },

  // Проверка является ли просмотр уникальным (для локального кэша)
  isUniqueView: (productId: number, timeWindow = 3600000): boolean => {
    const key = `last_view_${productId}`;
    const lastView = localStorage.getItem(key);
    const now = Date.now();
    
    if (!lastView || now - parseInt(lastView) > timeWindow) {
      localStorage.setItem(key, now.toString());
      return true;
    }
    
    return false;
  }
};
