import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "../features/auth/authApi";
import { classApi } from "../features/class/classApi";
import { subjectApi } from "../features/subject/subjectApi";
import { studentApi } from "../features/student/studentApi"; 
import { resultApi } from "../features/result/resultApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
    [subjectApi.reducerPath]: subjectApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer, 
    [resultApi.reducerPath]: resultApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      classApi.middleware,
      subjectApi.middleware,
      studentApi.middleware,
      resultApi.middleware
    ),
});
