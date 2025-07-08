'use client'

import { PropsWithChildren, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/src/hooks/useAuth'
import { getAccessToken } from '@/src/services/auth/auth.helper'

interface AuthProviderProps extends PropsWithChildren {
  Component?: {
    isOnlyUser?: boolean
  }
}

const AuthProvider = ({ children, Component }: AuthProviderProps) => {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isOnlyUser = Component?.isOnlyUser

  useEffect(() => {
    const token = getAccessToken()
    
    if (isOnlyUser) {
      if (!token && !isLoading) {
        router.push('/auth')
        return
      }
    }
  }, [user, isLoading, isOnlyUser, router, pathname])

  // Показываем loading только для защищенных страниц
  if (isOnlyUser && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}

export default AuthProvider