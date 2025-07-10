import { ICategory } from "./category.interface"
import { IReview } from "./review.interface"
import { IUser } from "./user.interface"

export interface IViews {
  id: number
  product: {
      id: number
      name: string
      slug: string
      description: string
      price: number
      reviews: IReview[]
      images: string[]
      createdAt: string
      category: ICategory
      viewsCount: number 
  }
  productId: number
  user: IUser
  userId: number
  viewedAt: string
}