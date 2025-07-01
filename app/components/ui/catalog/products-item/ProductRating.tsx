import { ReviewService } from '@/app/services/review.service'
import { IProduct } from '@/app/types/product.interface'
import { IReview } from '@/app/types/review.interface'
import { useQuery } from '@tanstack/react-query'
import React, { FC, useState } from 'react'
import { Rating } from 'react-simple-star-rating'



const ProductRating: FC<{product: IProduct}> = ({product}) => {
 
  const [rating, setRating] = useState<number>(
    Math.round(
      product.reviews.reduce((acc, review) => acc + review.rating, 0)
       / product.reviews.length
    ) || 0
  )


  return (
    <div className='flex items-center'>
        <Rating
          readonly
          initialValue={rating}
          SVGstyle={{
            display: 'inline-block'
          }}
          size={20}
          allowFraction
          transition
        />
        <span className='sm:text-sm text-xs text-bg-color pt-2 pl-1'>{rating}</span>
       
    </div>
  )
}

export default ProductRating