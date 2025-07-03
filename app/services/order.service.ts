import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@/app/store/user/user.interface'

// import { axiosClassic } from '@/app/api/api.interceptor'
// import { REFRESH_TOKEN } from '@/app/constants/token.constants'
import {  } from '@/app/store/user/user.interface'
import axios from 'axios'
import { instance } from '@/app/api/api.interceptor'
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