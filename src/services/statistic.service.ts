import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@/src/store/user/user.interface'

// import { axiosClassic } from '@/app/api/api.interceptor'
// import { REFRESH_TOKEN } from '@/app/constants/token.constants'
import {  } from '@/src/store/user/user.interface'
import axios from 'axios'
import { instance } from '@/src/app/api/api.interceptor'
import { IReview } from '../types/review.interface'



type TypeStatisticsResponse	 = {
	name: string
	value: number
}

export const ReviewService = {
	async getMain() {
		return  instance<TypeStatisticsResponse>({
			url: `/satistics/main`,  
			method: 'GET',
		})
	}


}