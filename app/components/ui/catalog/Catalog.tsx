import { IProduct, TypePaginationProducts } from "@/app/types/product.interface";
import React, { FC, useContext, useState } from "react";
import ProductItem from "./products-item/ProductItem";
import { ThemeContext } from "@/app/providers/theme-provider";
import Heading from "../../Heading";
import { useActions } from "@/app/hooks/useActions";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProductService } from "@/app/services/product/product.service";
import { Pagination, Spinner } from "@nextui-org/react";

interface ICatalog {
  data: TypePaginationProducts;
  isLoading?: boolean;
  title?: string;
}

const Catalog: FC<ICatalog> = ({ data, title, }) => {
  
  const [page, setPage] = useState(1)
  
  const {data: response, isLoading} = useQuery({
    queryKey: ["products", page],
    queryFn: async ()=> {
      const result = await ProductService.getAll({
        page,
        perPage: 8,
        // sort
      })
      return result.data 
    }, 
    staleTime: 500,
    
  })
  if (isLoading) return <Spinner size="md"/>;

  return (
    <div className="w-[1200px] max-w-full mx-auto">
      {title && <Heading>{title}</Heading>}

      
      {response?.length ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-2 ">
          {response?.products.map((product, i) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div>There are no product</div>
      )}
      <Pagination siblings={2}  total={Math.ceil(response?.length? / 8) } onChange={prev => setPage(prev)}   initialPage={page} />
        
    </div>
  );
};

export default Catalog;
