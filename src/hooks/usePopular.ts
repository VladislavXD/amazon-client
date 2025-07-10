import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../services/product/product.service";

export const usePopularProducts = () => {
  const {data: popularProducts, isLoading, isError} = useQuery({
    queryKey: ['popular-products'],
    queryFn: async () => {
      return await ProductService.getPopularProducts()
    },
    staleTime: 1000 * 60 * 5, // 5 минут
    refetchOnWindowFocus: false,
  })

  
  
  return { popularProducts}
}

