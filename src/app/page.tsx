
import type { Metadata } from 'next'

import Home from '@/src/app/Home'
import { ProductService } from '../services/product/product.service'


export const metadata: Metadata = {
	description:
		'Free shipping on millions of items. Get the best of Shopping and Entertainment with Prime.'
}

export const revalidate = 60

async function getProducts() {
	const data = await ProductService.getAll({
		page: 1,
		perPage: 4,
		ratings: ''
	})

	return data
}

export default async function HomePage() {
	const data = await getProducts()

	return <Home products={data.products} length={data.length} />
}
