import Home from '@/app/components/screens/Home/Home'
import { ProductService } from '@/app/services/product/product.service'
import { IProduct, TypePaginationProducts, TypeProducts } from '@/app/types/product.interface'
import { GetStaticProps, NextPage } from 'next'
import React from 'react'



const HomePage: NextPage<TypePaginationProducts> = ({length, products}) => {

  return <Home products={products} length={length} />
}


// export const getStaticProps: GetStaticProps<TypePaginationProducts> 
// = async ()=> {  
//   const {data} = await ProductService.getAll({
//     page: 1,
//     perPage: 17
//   })
//   return {
//     props: data
//   }
// }


export default HomePage