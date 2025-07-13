import type { Metadata } from 'next'



import { NO_INDEX_PAGE } from '../../constants/seo.constants'
import ThanksPage from './Thanks'

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
}

export default function MyThanksPage() {
	return <ThanksPage />
}
