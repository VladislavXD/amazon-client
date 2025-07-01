import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@/app/store/user/user.interface'

// import { axiosClassic } from '@/app/api/api.interceptor'
// import { REFRESH_TOKEN } from '@/app/constants/token.constants'
import {  } from '@/app/store/user/user.interface'
import axios from 'axios'
import { axiosClassic, instance } from '@/app/api/api.interceptor'
import { ICategory } from '../types/category.interface'





export const CategoryService = {
	async getAll() {
		return  axiosClassic<ICategory[]>({
			url: `/categories`,
			method: 'GET',
		})
	},
	async getById(id: string | number){
		return  instance<ICategory>({
			url: `/category/${id}`,
			method: 'GET',
		})
	},
	async getBySlug(slug: string){
		return  axiosClassic<ICategory>({
			url: `/by-slug/${slug}`,
			method: 'GET',
		})
	},


	async createCategory(){
		return  instance<ICategory>({
			url: `/category`,
			method: 'POST',
		})
	},

	async update(id: string | number, name: string ){
		return  instance<ICategory>({
			url: `/category/${id}`,
			method: 'PUT',
			data: {name}
		})
	}, 
	async delete(id: string | number){
		return  instance<ICategory>({
			url: `/category/${id}`,
			method: 'DELETE',
			data: {name}
		})
	},


}