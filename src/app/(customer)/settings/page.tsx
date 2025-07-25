import type { Metadata } from 'next'



import { NO_INDEX_PAGE } from '../../constants/seo.constants'
import MySettings from './Settings'

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
}

export default function SettingsPage() {
	return <MySettings />
}
