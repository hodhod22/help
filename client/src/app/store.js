import { configureStore } from '@reduxjs/toolkit'
import { contactApi } from '../features/api/contactApi'
import uiReducer from '../features/ui/uiSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactApi.middleware),
})
