// RTK QUERY

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://srm-khaki-eight.vercel.app/api",
    credentials: "include", // 👈 COOKIE JWT 
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data
      })
    }),
    getProfile: builder.query({
      query: () => "/profile"
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST"
      })
    })
  })
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useLogoutMutation
} = authApi;





