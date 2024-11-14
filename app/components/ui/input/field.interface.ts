import { InputProps } from '@nextui-org/input'
import { InputHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

export interface IField extends Omit<InputProps, 'color' | 'size' | 'value' | 'onFocus'> {
	placeholder?: string
	Icon?: IconType
	error?: string
	type: 'email' | 'password'
	isClear?: boolean
} 