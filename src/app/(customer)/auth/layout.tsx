import React from 'react'
import Providers from '@/src/providers/Providers'
import '@/src/assets/styles/globals.scss'
import NextTopLoader from 'nextjs-toploader'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressContentEditableWarning className="dark">
      <body className="bg-black text-white">
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
