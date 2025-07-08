
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState, useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { HeroUIProvider, Spinner, ToastProvider } from '@heroui/react'

import { persistor, store } from '@/src/store/store'
import AuthProvider from '@/src/providers/authProvider/AuthProvider'
import NextTopLoader from 'nextjs-toploader'

// Оптимизированный QueryClient
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 минута
        gcTime: 10 * 60 * 1000, // 10 минут (заменяет cacheTime)
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        retry: 1,
      },
      mutations: {
        retry: 1,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: всегда создаем новый query client
    return makeQueryClient()
  } else {
    // Browser: создаем query client если его нет
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

// Компонент-обертка для ThemeProvider
function ThemeWrapper({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}

// Основной компонент Providers
export default function Providers({ children }: PropsWithChildren) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <PersistGate loading={<div className=''><NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        /></div>} persistor={persistor}>
          <NextUIProvider>
            <ThemeWrapper>
              <HeroUIProvider>
                <AuthProvider>
                  <ToastProvider placement="bottom-right" />
                  {children}
                </AuthProvider>
              </HeroUIProvider>
            </ThemeWrapper>
          </NextUIProvider>
        </PersistGate>
      </ReduxProvider>

    </QueryClientProvider>
  )
}