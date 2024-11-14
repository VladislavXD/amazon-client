import { IProduct } from "@/app/types/product.interface";

import React, { FC } from "react";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./FavoriteButton";
import AddToFavoriteButton from "./FavoriteButton";
import ProductRating from "./ProductRating";
import Link from "next/link";
import { convertPrice } from "@/app/utils/ConvertPrice";

import { IoEyeSharp } from "react-icons/io5";
import { Image } from "@nextui-org/react";
const ProductItem: FC<{ product: IProduct }> = ({ product }) => {

  return (
    <div className=" rounded-lg border-small w-[250px] mb-7  max-w-full">
      <div className="max-w-full sm:h-[350px] h-[180px] overflow-hidden relative z-3">
        <Link href={`/product/${product.slug}`}>
          <Image
            className=" max-w-full sm:max-h-[350px] max-h-[250px] rounded-lg h-full object-cover bg-cover"
            width={300}
            height={300}
            src={product.images[0]}
            alt={product.name}
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
        <Link href={`/category/${product.category.slug}`}>
          {" "}
          <div className="sm:text-sm text-xs  opacity-50">{product?.category?.name}</div>
        </Link>
        <ProductRating product={product} />
        <div className="flex justify-between">
          <span className="sm:text-md text-sm">{convertPrice(product.price)}</span>
          <span className="flex items-center  sm:text-sm gap-1 opacity-50 text-xs"><IoEyeSharp/> <p>{product.reviews.length}</p> </span>
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductItem;
