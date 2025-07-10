 export type TypeProductData = {

  name: string
  price: number
  description?: string 
  images: string[]
  categoryId: number
}

export type ProductViews = {
  productId: string | number
  viewsCount: number
}

export type TypeProductDataFilters = {
  sort?: EnumProductSort
  searchTerm?: string
  page?: string | number 
  perPage?: string | number
  categorySlug?: string
  ratings?: string
}



export enum EnumProductSort {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest'
}


