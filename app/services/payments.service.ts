import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@/app/store/user/user.interface'

// import { axiosClassic } from '@/app/api/api.interceptor'
// import { REFRESH_TOKEN } from '@/app/constants/token.constants'
import {  } from '@/app/store/user/user.interface'
import axios from 'axios'
import { instance } from '@/app/api/api.interceptor'
import { IPaymentResponse } from '../types/payment.interface'





export const OrdersService = {
	async getAll(amount: number) {
		return  instance.post<IPaymentResponse>('/payments', {amount}) 
	}
}