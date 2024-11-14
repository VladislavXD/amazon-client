// 'use client'

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { PropsWithChildren } from 'react'
// import { Provider as ReduxProvider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'



// import { persistor, store } from '@/app/store/store'
// import { AppProps } from 'next/app'
// import AuthProvider from './authProvider/AuthProvider'
// import { TypeComponentAuthFields } from './authProvider/authPage.types'

// const queryClient = new QueryClient({
// 	defaultOptions: {
// 		queries: {
// 			refetchOnWindowFocus: false
// 		}
// 	}
// })

// export default function Providers({ Component, pageProps }: AppProps & TypeComponentAuthFields) {
// 	return (
// 		<QueryClientProvider client={queryClient}>
// 			<ReduxProvider store={store}>
// 				{/* @ts-ignore */}
// 				<PersistGate loading ={null} persistor={persistor}>
// 						<AuthProvider Component={{isOnlyUser: Component.isOnlyUser}}>
// 							<Component {...pageProps}/> 
// 						</AuthProvider>
// 				</PersistGate>
// 			</ReduxProvider>
// 		</QueryClientProvider>
// 	)
// }