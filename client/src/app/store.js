import { configureStore } from "@reduxjs/toolkit";
import { contactApi } from "../features/api/contactApi";
import { userApi } from "../features/api/userApi";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactApi.middleware, userApi.middleware),
});
