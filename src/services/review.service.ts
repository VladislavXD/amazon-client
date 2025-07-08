import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@/src/store/user/user.interface'

// import { axiosClassic } from '@/app/api/api.interceptor'
// import { REFRESH_TOKEN } from '@/app/constants/token.constants'
import {  } from '@/src/store/user/user.interface'
import axios from 'axios'
import { axiosClassic, instance } from '@/src/app/api/api.interceptor'
import { IReview } from '../types/review.interface'



type TypeData = {
	rating: number,
	text: string
}

export const ReviewService = {
	async getAll() {
		return  axiosClassic<IReview[]>({
			url: `/reviews`,
			method: 'GET',
		})
	},

	async create(productId: string | number, data: TypeData){
		return  axiosClassic<IReview>({ 
			url: `/reviews/create/${productId}`,
			method: 'POST',
			data
		})
	},
	async getAverageByProduct(productId: string | number){
		return  instance<number>({ 
			url: `/reviews/average-by-product/${productId}`,
			method: 'GET'
		})
	},


}