import { IProduct, TypePaginationProducts } from "@/app/types/product.interface";
import React, { FC, useContext, useEffect, useState } from "react";
import ProductItem from "./products-item/ProductItem";
import { ThemeContext } from "@/app/providers/theme-provider";
import Heading from "../../Heading";
import { useActions } from "@/app/hooks/useActions";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProductService } from "@/app/services/product/product.service";
import { Pagination, Spinner } from "@nextui-org/react";
import SelectCategory from "./SelectCategory";
import { useRouter } from "next/router";


interface ICatalog {
  data: TypePaginationProducts;
  isLoading?: boolean;
  title?: string;
  isPagination?: boolean;
}

const Catalog: FC<ICatalog> = ({ data, title, isPagination = false}) => {
  const [page, setPage] = useState(1)
  const router = useRouter();
  const categoryFromQuery = router.query.category as string || 'all';
  const sortFromQuery = router.query.sort as string || 'newest'
  // Сбрасываем страницу на 1 при изменении категории
  useEffect(() => {
    setPage(1);
  }, [categoryFromQuery, sortFromQuery]);
  
  const {data: response, isLoading} = useQuery({
    queryKey: ["products", page, categoryFromQuery, sortFromQuery],
    queryFn: async ()=> {
      const result = await ProductService.getAll({
        page,
        perPage: 8,
        categorySlug: categoryFromQuery !== 'all' ? categoryFromQuery : undefined,
        sort: sortFromQuery as any
      })
      return result.data 
    }, 
    staleTime: 500,
      
  })





  

  return (
    <>
      
      <div className="w-[1200px] max-w-full mx-auto ease-linear transition-all">

        {title && <Heading>{title}</Heading>}

        {isPagination ? (<SelectCategory/>) : null}
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="md" />
          </div>
        ) : (
          <>
            {response?.length ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-2 ">
                {response?.products.map((product, i) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div>There are no product</div>
            )}
            
            {response?.length ? (
              <Pagination 
                siblings={2}  
                total={Math.ceil((response?.length ?? 0) / 8)} 
                onChange={prev => setPage(prev)}   
                page={page}
                className="mt-4 flex justify-center"
              />
            ) : null}
          </>
        )}
          
      </div>
    </>
  );
};

export default Catalog;
