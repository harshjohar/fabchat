import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../typings/User'
import { RootState } from '../store'

const initialState : User = {
    uid: null,
    displayName: null,
    email: null,
    photoURL: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser : (state, action: PayloadAction<User>) => {
            state.displayName = action.payload.displayName,
            state.email = action.payload.email,
            state.uid = action.payload.uid,
            state.photoURL = action.payload.photoURL
        },
    }
})

export const {setUser} = userSlice.actions

export const selectUser = (state : RootState) => state.user

export default userSlice.reducer