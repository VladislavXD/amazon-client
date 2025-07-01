import { createSlice } from '@reduxjs/toolkit'

// import { getStoreLocal } from '@/utils/local-storage'

import { checkAuth, login, logout, register } from './user.actions'
import { IInitialState } from './user.interface'
import { getStoreLocal } from '@/app/utils/localStorage'

const initialState: IInitialState = {
	user: getStoreLocal('user'),
	isLoading: false,
	error: null
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.user = null;
				state.error = action.payload as string; 
			
			})
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.user = null
				state.error = action.payload as string
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
	}
})
