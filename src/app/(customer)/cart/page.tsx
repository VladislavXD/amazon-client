import type { Metadata } from 'next'



import { NO_INDEX_PAGE } from '../../constants/seo.constants'
import MyCart from './MyCart'

export const metadata: Metadata = {
	title: 'My Cart',
	...NO_INDEX_PAGE
}

export default function ProfilePage() {
	return <MyCart />
}
