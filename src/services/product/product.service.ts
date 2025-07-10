import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@/src/store/user/user.interface'

// import { axiosClassic } from '@/app/api/api.interceptor'
// import { REFRESH_TOKEN } from '@/app/constants/token.constants'
import {  } from '@/src/store/user/user.interface'
import axios from 'axios'
import { axiosClassic, instance } from '@/src/app/api/api.interceptor'
import { IProduct, TypePaginationProducts, TypeProducts } from '../../types/product.interface'
import { ProductViews, TypeProductData, TypeProductDataFilters } from './product.types'





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




	async addView({ productId, userId }: { productId: string | number, userId?: number }) {
		return  await instance({
			url: `/products/view/${productId}`,
			method: 'POST',
			data: { userId }
		})
	},

	async getRecentlyViewed() {
		const {data} =  await instance<IProduct[]>({
			url: `/products/recently-viewed/list`,
			method: 'GET',
		})

		return data
	},

	async getPopularProducts(){
		const {data} =  await instance<IProduct[]>({
			url: `/products/popular/list`,
			method: 'GET',
		})

		return data
	},
	

	async getViewsCount(productId: string | number) {
		return await instance<ProductViews>({
			url: `/products/views-count/${productId}`,
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



