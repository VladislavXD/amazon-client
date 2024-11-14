import { FC, PropsWithChildren } from "react";
import { TypeComponentAuthFields } from "./authPage.types";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/router";

const CheckRole: 
FC<PropsWithChildren<TypeComponentAuthFields>> = ({
  Component: { isOnlyUser},
  children}) => {
  const {user} = useAuth()

  const router = useRouter()
 
  if (user && isOnlyUser) return <>{children}</>

  router.pathname !== '/auth' && router.replace('/auth')
  return null
}


export default CheckRole