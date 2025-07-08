import { useAuth } from '@/src/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const useAuthRedirect = () => {
  const {user} =  useAuth()

  const {replace} = useRouter()

  useEffect(()=> {
    if(user) replace('/')
  }, [user])
}

export default useAuthRedirect