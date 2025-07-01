import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@/app/store/user/user.interface'

// import { axiosClassic } from '@/app/api/api.interceptor'
// import { REFRESH_TOKEN } from '@/app/constants/token.constants'
import {  } from '@/app/store/user/user.interface'
import axios from 'axios'
import { axiosClassic, instance } from '@/app/api/api.interceptor'
import { IProduct, TypePaginationProducts, TypeProducts } from '../../types/product.interface'
import { TypeProductData, TypeProductDataFilters } from './product.types'





export const ProductService = {
	async getAll(queryData = {} as TypeProductDataFilters) {
		return  axiosClassic <TypePaginationProducts>({
			url: `/products`,
			method: 'GET',
			params: queryData
		})
	},
	async getSimelai(id: string | number) {
		return  axiosClassic<IProduct>({
			url: `/products/similar/${id}`,
			method: 'GET',
		})
	},

	async getBySLug(slug: string){
		return  axiosClassic<IProduct>({
			url: `/products/by-slug/${slug}`,
			method: 'POST',
		})
	},
	async getByCategory(categorySlug: string){
		return  axiosClassic<IProduct>({
			url: `/products/by-category/${categorySlug}`,
			method: 'GET',
		})
	},

	async getbyId(id: string | number) {
		return  instance<IProduct>({
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