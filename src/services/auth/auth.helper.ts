import Cookies from 'js-cookie'

import { IAuthResponse, ITokens } from '@/src/store/user/user.interface'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/src/app/constants/token.constants'

export const getAccessToken = () => {
	const accessToken = Cookies.get(ACCESS_TOKEN)
	return accessToken || null
}

export const getUserFromStorage = () => {
	return JSON.parse(localStorage.getItem('user') || '{}')
}

export const saveTokensStorage = (data: ITokens) => {
	const cookieOptions = {
        expires: 7, // 7 дней
        secure: process.env.NODE_ENV === 'production', // HTTPS только в продакшене
        sameSite: 'lax' as const, // Защита от CSRF
        domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined
    }

	Cookies.set(ACCESS_TOKEN, data.accessToken, cookieOptions)
	Cookies.set(REFRESH_TOKEN, data.refreshToken, {...cookieOptions, expires: 30})
}

export const removeFromStorage = () => {
	const cookieOptions = {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined
    }
	Cookies.remove(ACCESS_TOKEN, cookieOptions)
	Cookies.remove(REFRESH_TOKEN, cookieOptions)
	localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}