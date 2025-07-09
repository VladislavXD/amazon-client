'use client'

import React, { FC } from 'react'
import Catalog from './components/ui/catalog/Catalog'
import { TypePaginationProducts } from '@/src/types/product.interface'




const Home: FC<TypePaginationProducts> = ({products, length }) => {

  return (
    <>
      {/* Carousel */}
        <Catalog title={'Freshed Products'} data={{products, length}} isPagination />
    </>
  )
}

export default Home