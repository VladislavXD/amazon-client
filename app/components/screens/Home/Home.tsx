import React, { FC } from 'react'
import Meta from '../../ui/Meta'
import Catalog from '../../ui/catalog/Catalog'
import { TypePaginationProducts, TypeProducts } from '@/app/types/product.interface'
import Heading from '../../Heading'
import Layout from '../../ui/layout/Layout'




const Home: FC<TypePaginationProducts> = ({products, length }) => {

  return (
    <Meta title='Home'>
      {/* Carousel */}
      
          
        <Layout>
          <Catalog title={'Freshed Products'} data={{products, length}}  />
        </Layout>

    </Meta>
  )
}

export default Home