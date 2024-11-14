import { useAuth } from '@/app/hooks/useAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const useAuthRedirect = () => {
  const {user} =  useAuth()

  const {replace} = useRouter()

  useEffect(()=> {
    if(user) replace('/')
  }, [user])
}

export default useAuthRedirect