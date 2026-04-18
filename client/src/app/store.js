import { configureStore } from '@reduxjs/toolkit'
import { contactApi } from '../features/api/contactApi'
import uiReducer from '../features/ui/uiSlice'
import { userApi } from "../features/api/userApi";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactApi.middleware, userApi.middleware),
});
