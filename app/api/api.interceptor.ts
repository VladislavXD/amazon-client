import axios from "axios";
import { errorCatch, getContentType } from "./api.helper";
import { getAccessToken, removeFromStorage } from "../services/auth/auth.helper";
import { AuthService } from "../services/auth/auth.service";




const axiosOptions = {
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	headers: getContentType()
}

export const axiosClassic = axios.create(axiosOptions)

export const instance = axios.create(axiosOptions)



instance.interceptors.request.use( config => {
  const accessToken = getAccessToken()

  if(config.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`

return config
})

instance.interceptors.response.use(
  config => config,
  async error => {  
    const originalRequest = error.config

    if
    (
      (error?.response?.status === 401 || 
        errorCatch(error) === 'jwt expired' || 
        errorCatch(error) === 'jwt must be provided') 
        &&
        error.config && !error.config._isRetry
    ){
      originalRequest._isRetry = true
      try{
        await AuthService.getNewTokens()
        // new 1token
        return instance.request(originalRequest)
      }catch(error){
        if(errorCatch(error) === 'jwt expired') 
          // delete token 
          removeFromStorage()
      }
    }
  }
)