import '@/app/store/registerApis'
import { combineReducers } from '@reduxjs/toolkit'
import { baseApi } from '@/app/store/api/baseApi'

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
})
