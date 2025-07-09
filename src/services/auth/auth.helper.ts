import Cookies from 'js-cookie'

import { IAuthResponse, ITokens } from '@/src/store/user/user.interface'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/src/app/constants/token.constants'

export const getAccessToken = () => {
	// Сначала пробуем получить из cookies
	let accessToken = Cookies.get(ACCESS_TOKEN)
	
	// Если нет в cookies, пробуем localStorage (fallback для продакшена)
	if (!accessToken && typeof window !== 'undefined') {
		accessToken = localStorage.getItem(ACCESS_TOKEN) || undefined
	}
	
	console.log('Getting access token:', accessToken ? 'Token exists' : 'No token found')
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
        // Убираем domain для правильной работы на поддоменах Vercel
    }

	console.log('Saving tokens with options:', cookieOptions)
	
	// Сохраняем в cookies
	Cookies.set(ACCESS_TOKEN, data.accessToken, cookieOptions)
	Cookies.set(REFRESH_TOKEN, data.refreshToken, {...cookieOptions, expires: 30})
	
	// Дублируем в localStorage как fallback для продакшена
	if (typeof window !== 'undefined') {
		localStorage.setItem(ACCESS_TOKEN, data.accessToken)
		localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
	}
	
	console.log('Tokens saved successfully')
}

export const removeFromStorage = () => {
	const cookieOptions = {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        // Убираем domain для правильной работы
    }
	Cookies.remove(ACCESS_TOKEN, cookieOptions)
	Cookies.remove(REFRESH_TOKEN, cookieOptions)
	localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}