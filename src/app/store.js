import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from '../services/user'
import userReducer from '../features/userSlice'
import authReducer from '../features/authSlice'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    user: userReducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})

setupListeners(store.dispatch)