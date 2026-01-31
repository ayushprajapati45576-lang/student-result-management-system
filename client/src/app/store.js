import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
// import authReducer from "../features/auth/authSlice";
import {classApi} from "../features/class/classApi";


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [classApi.reducerPath]: classApi.reducer,

        // auth:authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware,classApi.middleware)
});