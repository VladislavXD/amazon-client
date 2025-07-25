import type { Metadata } from 'next'



import { NO_INDEX_PAGE } from '../../constants/seo.constants'
import ViewsHistory from './ViewHistory'

export const metadata: Metadata = {
	title: 'Recently Viewed Products',
	...NO_INDEX_PAGE
}

export default function ProfilePage() {
	return <ViewsHistory />
}
