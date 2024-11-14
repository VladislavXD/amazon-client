import { useActions } from '@/app/hooks/useActions'
import { useCart } from '@/app/hooks/useCart'
import { IProduct } from '@/app/types/product.interface'
import { Button } from '@nextui-org/react'
import { current } from '@reduxjs/toolkit'
import Link from 'next/link'
import React, { FC } from 'react'
import { CiHeart } from "react-icons/ci";
import { IoHeartDislikeOutline } from "react-icons/io5";

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
        onClick={() =>
          !currenElement
            && addToCart({
                product,
                quantity: 1,
                price: product.price,
              })
        }
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