import { IOrder } from './order.interface'
import { IProduct } from './product.interface'

export interface IUser {
	id: number
	email: string
	name: string
	avatarUrl: string
	phone: string
	isAdmin: boolean
}

export interface IFullUser extends IUser {
	favorites: IProduct[]
	orders: IOrder[]
}