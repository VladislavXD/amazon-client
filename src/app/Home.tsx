

import React, { FC } from 'react'
import Catalog from './components/ui/catalog/Catalog'
import { TypePaginationProducts, TypeProducts } from '@/src/types/product.interface'
import Heading from './components/Heading'




const Home: FC<TypePaginationProducts> = ({products, length }) => {

  return (
    <>
      {/* Carousel */}
        <Catalog title={'Freshed Products'} data={{products, length}} isPagination />
    </>
  )
}

export default Home