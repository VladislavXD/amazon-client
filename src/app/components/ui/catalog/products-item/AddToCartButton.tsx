import { useActions } from '@/src/hooks/useActions'
import { useCart } from '@/src/hooks/useCart'
import { IProduct } from '@/src/types/product.interface'
import { Button } from '@nextui-org/react'
import { current } from '@reduxjs/toolkit'
import Link from 'next/link'
import React, { FC } from 'react'
import { CiHeart } from "react-icons/ci";
import { IoHeartDislikeOutline } from "react-icons/io5";
import {addToast} from "@heroui/react";


const AddToCartButton: FC<{product: IProduct}> = ({product}) => {
  const {addToCart, removeFromCart} = useActions()
  const {items} = useCart()


  const currenElement = items.find(
    cartItem => cartItem.product.id == product.id
  )


  return (
    <div className="py-3  ">
    {currenElement ? (
      <Link href={`/cart`}>
        <Button 
        color="primary" 
        className="w-full h-9" 
        variant="bordered">
          Buy
        </Button>
      </Link>
    ) : (
      <Button
        onPress={() => {
          if (!currenElement) {
            addToCart({
              product,
              quantity: 1,
              price: product.price,
            });
            addToast({
              title: "✅ Добавлено в корзину",
              description: `${product.name} успешно добавлен в корзину`,
              timeout: 3000,
              shouldShowTimeoutProgress: true,
              hideIcon: true
            });
          }
        }}
        color="primary"
        className="w-full h-9"
        variant={"shadow"}
      >
        Add to cart
      </Button>
    )}
  </div>
  )
}

export default AddToCartButton