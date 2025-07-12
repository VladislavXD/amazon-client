import { useActions } from '@/src/hooks/useActions'
import { useCart } from '@/src/hooks/useCart'
import { IProduct } from '@/src/types/product.interface'
import { Button } from '@nextui-org/react'
import { current } from '@reduxjs/toolkit'
import Link from 'next/link'
import React, { FC } from 'react'
import { CiHeart } from "react-icons/ci";
import { IoHeartDislikeOutline } from "react-icons/io5";
import {addToast, Image} from "@heroui/react";


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
                title: (
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0] || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.jpg";
                      }}
                    />
                    <div>
                      <div className="font-semibold text-sm">✅ Добавлено в корзину</div>
                      <div className="text-xs text-gray-600">{product.name}</div>
                    </div>
                  </div>
                ),
                timeout: 4000,
                shouldShowTimeoutProgress: true,
                hideIcon: true,
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