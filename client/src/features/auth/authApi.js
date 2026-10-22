// RTK QUERY

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL || ""}/api`,
    credentials: "include", // 👈 COOKIE JWT 
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined" && token !== "null") {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["User"]
    }),
    getProfile: builder.query({
      query: () => "/profile",
      providesTags: ["User"]
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST"
      }),
      invalidatesTags: ["User"]
    })
  })
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useLogoutMutation
} = authApi;




