import { IProduct } from "@/src/types/product.interface";

import React, { FC } from "react";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./FavoriteButton";
import AddToFavoriteButton from "./FavoriteButton";
import ProductRating from "./ProductRating";
import ProductViewsCount from "./ProductViewsCount";
import Link from "next/link";
import { convertPrice } from "@/src/app/utils/ConvertPrice";

import { IoEyeSharp } from "react-icons/io5";
import { Image } from "@nextui-org/react";
const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div className=" rounded-lg  w-[250px] mb-7  max-w-full">
      <div className="max-w-full sm:h-[300px] h-[180px] overflow-hidden relative z-3">
        <Link href={`/product/${product.slug}`}>
          <Image
            className=" max-w-full sm:max-h-[350px] max-h-[250px] rounded-lg h-full object-cover bg-cover"
            width={300}
            height={300}
            src={product.images[0]}
            alt={product.name}
            isBlurred
            
          />
        </Link>
        <div className="absolute rounded-large z-10 top-0 right-0 p-3">
          <AddToFavoriteButton productId={product.id} />
        </div>
      </div>
      <div className="pt-3 px-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="md:text-md overflow-ellipsis whitespace-nowrap overflow-hidden sm:w-[150px] md:w-[143px] lg:w-[190px]  sm:text-sm text-xs">{product.name}</h3>
        </Link>
        <Link href={`/category/${product.category.slug }`}>
          {" "}
          <div className="sm:text-sm text-xs  opacity-50">{product?.category?.name}</div>
        </Link>
        <ProductRating product={product} />
        <div className="flex justify-between">
          <span className="sm:text-md text-sm">{convertPrice(product.price)}</span>
          <ProductViewsCount 
            productId={product.id} 
            initialCount={product.viewsCount || 0}
          />
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductItem;
