

import { Metadata } from 'next'



import Product from './Product'
import { ProductService } from '@/src/services/product/product.service'
import { IPageSlugParam, TypeParamSlug } from '@/src/types/page-params'



export const revalidate = 60

// export async function generateStaticParams() {
// 	const {products} = await ProductService.getAll()
// 	console.log('generateStaticParams', products)
// 	const paths = products.map(product => {
// 		return {
// 			params: { slug: product.slug }
// 		}
	// 	})
		

// 	return paths
// }


async function getProduct(params: TypeParamSlug) {
	const product = await ProductService.getBySlug(params?.slug as string)

	const { data: similarProducts } = await ProductService.getSimilar(product.id)

	return {
		product,
		similarProducts
	}
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	const { product } = await getProduct(params)

	return {
		title: product.name,
		description: product.description,
		category: product.category.name,
		openGraph: {
			images: product?.images || [],
			description: product.description
		}
	}
}

export default async function ProductPage({ params }: IPageSlugParam) {

	const { product, similarProducts } = await getProduct(params)

	return (
		<Product
			initialProduct={product}
			similarProducts={similarProducts}
			slug={params.slug}
		/>
	)
}
