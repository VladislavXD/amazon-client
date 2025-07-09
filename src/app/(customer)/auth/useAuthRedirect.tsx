import { useAuth } from '@/src/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const useAuthRedirect = () => {
  const {user, isLoading} =  useAuth()

  const {replace} = useRouter()

  useEffect(()=> {
    if (isLoading) return
    if(user) {
      // Добавляем небольшую задержку для корректной синхронизации

        replace('/')

    }
  }, [user])
}

export default useAuthRedirect