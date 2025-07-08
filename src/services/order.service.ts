import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@/src/store/user/user.interface'

// import { axiosClassic } from '@/app/api/api.interceptor'
// import { REFRESH_TOKEN } from '@/app/constants/token.constants'
import {  } from '@/src/store/user/user.interface'
import axios from 'axios'
import { instance } from '@/src/app/api/api.interceptor'
import { EnumOrderStatus, IOrder } from '../types/order.interface'
import { ICartItem } from '../types/cart.interface'



type TypeData = {
	status?: EnumOrderStatus,
	items: {
	quantity: number
		price: number
		productId: number
	}[]
}



export const OrdersService = {
	async getAll() {
		return  instance<IOrder[]>({
			url: `/orders`,
			method: 'GET',
		})
	},


	async placeOrder(data: TypeData) {
		return  instance<{confirmation: {confirmation_url: string}}>({
			url: `/orders`,
			method: 'POST',
			data
		})
	},

}