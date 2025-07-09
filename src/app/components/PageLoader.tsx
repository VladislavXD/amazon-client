'use client'

import { useAuth } from '@/src/hooks/useAuth'
import { Spinner } from '@heroui/react'
import { PropsWithChildren, useEffect, useState } from 'react'

const PageLoader = ({ children }: PropsWithChildren) => {
  const { isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Небольшая задержка для корректной инициализации
    const timer = setTimeout(() => {
      setMounted(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner size="lg" color="primary" />
      </div>
    )
  }

  return <>{children}</>
}

export default PageLoader
