import { configureStore , ThunkAction, Action} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { createWrapper} from 'next-redux-wrapper'

export const store = () => configureStore({
  reducer: {
    user: userReducer
  },
})

type Store = ReturnType<typeof store>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;

export const wrapper = createWrapper(store,  { debug: true })