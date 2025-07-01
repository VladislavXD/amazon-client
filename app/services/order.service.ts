import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@/app/store/user/user.interface'

// import { axiosClassic } from '@/app/api/api.interceptor'
// import { REFRESH_TOKEN } from '@/app/constants/token.constants'
import {  } from '@/app/store/user/user.interface'
import axios from 'axios'
import { instance } from '@/app/api/api.interceptor'
import { IOrder } from '../types/order.interface'



type TypeData = {
	rating: number,
	text: string
}

export const OrdersService = {
	async getAll() {
		return  instance<IOrder[]>({
			url: `/orders`,
			method: 'GET',
		})
	}


}