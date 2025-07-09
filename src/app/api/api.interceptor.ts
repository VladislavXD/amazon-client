import axios from "axios";
import { errorCatch, getContentType } from "./api.helper";
import { getAccessToken, removeFromStorage } from "../../services/auth/auth.helper";
import { AuthService } from "../../services/auth/auth.service";




const axiosOptions = {
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	headers: getContentType()
}

export const axiosClassic = axios.create(axiosOptions)

export const instance = axios.create(axiosOptions)



instance.interceptors.request.use( config => {
  const accessToken = getAccessToken()
  
  console.log('Making request to:', config.url)
  console.log('Access token exists:', !!accessToken)

  if(config.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`

return config
})

instance.interceptors.response.use(
  config => config,
  async error => {  
    console.log('API Error:', error.response?.status, error.response?.data)
    
    const originalRequest = error.config

    if
    (
      (error?.response?.status === 401 || 
        errorCatch(error) === 'jwt expired' || 
        errorCatch(error) === 'jwt must be provided') 
        &&
        error.config && !error.config._isRetry
    ){
      console.log('Attempting to refresh tokens...')
      originalRequest._isRetry = true
      try{
        await AuthService.getNewTokens()
        console.log('Tokens refreshed successfully')
        return instance.request(originalRequest)
      }catch(error){
        console.log('Token refresh failed:', error)
        if(errorCatch(error) === 'jwt expired') 
          removeFromStorage()
      }
    }
    
    throw error
  }
)