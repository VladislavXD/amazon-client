import { useCallback, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ProductService } from '../services/product/product.service'
import { useAuth } from './useAuth'
import { ProductViewsEvents } from '../utils/productViewsEvents'

// Хук для добавления просмотра товара
export const useAddProductView = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ productId, userId }: { productId: number, userId?: number }) => 
      ProductService.addView({ productId, userId }),
    onSuccess: (data, variables) => {
      // Инвалидируем кэш для конкретного товара
      queryClient.invalidateQueries({ 
        queryKey: ['product-views-count', variables.productId] 
      })
      
      // Также инвалидируем общие запросы товаров
      queryClient.invalidateQueries({ 
        queryKey: ['products'] 
      })
      
      // Инвалидируем запросы каталога
      queryClient.invalidateQueries({ 
        queryKey: ['get categories'] 
      })
    },
    onError: (error) => {
      console.error('Ошибка при добавлении просмотра:', error)
    }
  })
}

// Хук для получения количества просмотров с оптимистичными обновлениями
export const useProductViewsCount = (productId: number) => {
  const queryClient = useQueryClient()
  
  return useQuery({
    queryKey: ['product-views-count', productId],
    queryFn: () => ProductService.getViewsCount(productId),
    select: (data) => data.data,
    enabled: !!productId,
    staleTime: 2 * 60 * 1000, // Уменьшаем время жизни кэша до 2 минут для более частых обновлений
    refetchOnWindowFocus: true, // Включаем обновление при фокусе окна
    refetchInterval: 30 * 1000, // Автообновление каждые 30 секунд для активных товаров
  })
}

// Хук для автоматического добавления просмотра при посещении товара
export const useProductViewTracker = (productId: number) => {
  const { mutate: addView } = useAddProductView()
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const trackView = useCallback(() => {
    if (productId) {
      // Проверяем, был ли уже добавлен просмотр для этого товара в текущей сессии
      const viewKey = `product_view_${productId}`
      const sessionViewed = sessionStorage.getItem(viewKey)
      const now = Date.now()
      
      // Если просмотр не был добавлен в текущей сессии или прошло более часа
      if (!sessionViewed || now - parseInt(sessionViewed) > 3600000) {
        // Получаем userId из localStorage или другого источника
        const storedUser = localStorage.getItem('user')
        let userId = undefined
        
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser)
            userId = userData.id
          } catch (e) {
            console.warn('Не удалось получить userId из localStorage')
          }
        }
        
        addView({ productId, userId }, {
          onSuccess: () => {
            // Диспатчим событие о добавлении просмотра
            ProductViewsEvents.dispatchViewAdded(productId)
            
            // Обновляем кэш сразу после успешного добавления просмотра
            setTimeout(() => {
              queryClient.invalidateQueries({ 
                queryKey: ['product-views-count', productId] 
              })
            }, 100)
          }
        })
        sessionStorage.setItem(viewKey, now.toString())
      }
    }
  }, [productId, addView, user, queryClient])

  return { trackView }
}

// Хук для автоматического отслеживания просмотров на странице товара
export const useProductPageView = (productId: number) => {
  const { trackView } = useProductViewTracker(productId)

  useEffect(() => {
    if (productId) {
      // Небольшая задержка для того, чтобы страница загрузилась
      const timer = setTimeout(() => {
        trackView()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [productId, trackView])
}

// Хук для оптимистичного обновления счетчика просмотров
export const useOptimisticViewsCount = (productId: number, initialCount: number = 0) => {
  const queryClient = useQueryClient()
  const { data: serverData, isLoading } = useProductViewsCount(productId)
  
  // Функция для оптимистичного увеличения счетчика
  const incrementViewsOptimistically = useCallback(() => {
    queryClient.setQueryData(['product-views-count', productId], (oldData: any) => {
      if (oldData) {
        return { ...oldData, viewsCount: oldData.viewsCount + 1 }
      }
      return { viewsCount: initialCount + 1 }
    })
  }, [queryClient, productId, initialCount])
  
  // Подписываемся на события добавления просмотров для оптимистичного обновления
  useEffect(() => {
    const unsubscribe = ProductViewsEvents.onViewAdded((viewedProductId) => {
      if (viewedProductId === productId) {
        incrementViewsOptimistically()
      }
    })
    
    return unsubscribe
  }, [productId, incrementViewsOptimistically])
  
  const viewsCount = serverData?.viewsCount ?? initialCount
  
  return {
    viewsCount,
    isLoading,
    incrementViewsOptimistically
  }
}
