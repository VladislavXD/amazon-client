import { Component, FC, PropsWithChildren, useEffect } from "react";
import { TypeComponentAuthFields } from "./authPage.types";
import dynamic from "next/dynamic";
import { useAuth } from "@/app/hooks/useAuth";
import { useActions } from "@/app/hooks/useActions";
import { useRouter } from "next/router";
import { getAccessToken } from "@/app/services/auth/auth.helper";
import Cookies from "js-cookie";

const DynamicCheckRole = dynamic(() => import('./ChekRole'), {ssr: false})

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> =
(
  {
    Component: {isOnlyUser},
    children
  }
) => {

  const {user} = useAuth()
  const {checkAuth, logout} = useActions()

  const {pathname} = useRouter()

  useEffect(()=> {
    const accesToken = getAccessToken()
    if(accesToken){
      checkAuth()
    }
  }, [checkAuth])
  
  useEffect(()=> {
    const refreshToken = Cookies.get('refreshToken')
    if(!refreshToken && user){
      logout()
    }
  }, [pathname, user, logout])


  return isOnlyUser? (
  <DynamicCheckRole Component={{isOnlyUser}} children={children}>
  </DynamicCheckRole>
  ) : (
    <>{children}</>
  )
}



export default AuthProvider