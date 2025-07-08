import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@/src/store/user/user.interface'

// import { axiosClassic } from '@/app/api/api.interceptor'
// import { REFRESH_TOKEN } from '@/app/constants/token.constants'
import {  } from '@/src/store/user/user.interface'
import axios from 'axios'
import { instance } from '@/src/app/api/api.interceptor'
import { IPaymentResponse } from '../types/payment.interface'





export const OrdersService = {
	async getAll(amount: number) {
		return  instance.post<IPaymentResponse>('/payments', {amount}) 
	}
}