import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@/src/store/user/user.interface'

// import { axiosClassic } from '@/app/api/api.interceptor'
// import { REFRESH_TOKEN } from '@/app/constants/token.constants'
import {  } from '@/src/store/user/user.interface'
import axios from 'axios'
import { axiosClassic, instance } from '@/src/app/api/api.interceptor'
import { IProduct, TypePaginationProducts, TypeProducts } from '../../types/product.interface'
import { TypeProductData, TypeProductDataFilters } from './product.types'





export const ProductService = {
	async getAll(queryData = {} as TypeProductDataFilters) {
		const {data} = await axiosClassic <TypePaginationProducts>({
			url: `/products`,
			method: 'GET',
			params: queryData
		})
		return data
	},
	
	async getSimilar(id: string | number) {
		return  await axiosClassic<IProduct[]>({
			url: `/products/similar/${id}`,
			method: 'GET',
		})
	},

	async getBySlug(slug: string){
		const {data} = await  axiosClassic<IProduct>({
			url: `/products/by-slug/${slug}`,
			method: 'GET',	
		})
		return data
	},

	async getByCategory(categorySlug: string){
		return  await axiosClassic<IProduct>({
			url: `/products/by-category/${categorySlug}`,
			method: 'GET',
		})
	},

	async getbyId(id: string | number) {
		return  await instance<IProduct>({
			url: `/products/${id}`,
			method: 'GET',
		})
	},


	async create(){
		return  instance<IProduct>({
			url: `/products`,
			method: 'POST',
		})
	},

	async update(id: string | number, data: TypeProducts ){
		return  instance<IProduct>({
			url: `/products/${id}`,
			method: 'PUT',
			data
		})
	}, 

	async delete(id: string | number){
		return  instance<IProduct>({
			url: `/products/${id}`,
			method: 'DELETE',
		})
	},

}



