import type { Metadata } from 'next'



import { NO_INDEX_PAGE } from '../../constants/seo.constants'
import AuthPage from './Auth'

export const metadata: Metadata = {
	title: 'Authentication',
	...NO_INDEX_PAGE
}

export default function ProfilePage() {
	return <AuthPage />
}
