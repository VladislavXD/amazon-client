import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@/src/store/user/user.interface'

import { axiosClassic } from '@/src/app/api/api.interceptor'

import { saveToStorage } from './auth.helper'
import { REFRESH_TOKEN } from '@/src/app/constants/token.constants'
import {  } from '@/src/store/user/user.interface'
import { instance } from '@/src/app/api/api.interceptor'

export const AuthService = {
	async main(type: 'login' | 'register', data: IEmailPassword) {
		const response = await  axiosClassic<IAuthResponse>({
			url: `/auth/${type}`,
			method: 'POST',
			data
		})
		
		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async getNewTokens() {
		const refreshToken = Cookies.get(REFRESH_TOKEN)

		const response = await axiosClassic.post<string, { data: IAuthResponse }>(
			'/auth/login/access-token',
			{ refreshToken }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	}
}