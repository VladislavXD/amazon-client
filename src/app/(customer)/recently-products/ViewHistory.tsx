"use client";
import Heading from "../../components/Heading";
import FavoriteProductItem from "../../components/ui/catalog/products-item/FavoriteProductItem";
import { NextPage } from "next";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/src/services/product/product.service";
import { Spinner } from "@heroui/react";


const ViewsHistory: NextPage = () => {
    const {data: recentlyViewed, isLoading} = useQuery({
    queryKey: ['recently-viewed'],
    queryFn: async () => {
      return await ProductService.getRecentlyViewed()
    },
    staleTime: 1000 * 60 * 5, // 5 минут
    refetchOnWindowFocus: false,
  })



 if (isLoading) return <Spinner size="md" className="w-full flex items-center justify-center h-screen"/>


  return (
        <div className="w-[1200px] max-w-full mx-auto ease-linear transition-all">
          <Heading>
            <h1 className="text-5xl pt-5 pb-5 font-bold">Recently Products</h1>
          </Heading>
          
            {recentlyViewed?.length ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-2 ">
                {recentlyViewed.map((product) => (
                  <FavoriteProductItem key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-lg">You have no recently view.</p>
            )}

        </div>
  );
};


export default ViewsHistory;
