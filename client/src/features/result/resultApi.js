import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resultApi = createApi({
  reducerPath: "resultApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include"
  }),
  tagTypes: ["Result"],

  endpoints: (builder) => ({

    // ✅ ADD BULK RESULT
    addBulkResult: builder.mutation({
      query: (data) => ({
        url: "/admin/result/bulk",  // 👈 apna route check kar lena
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Result"]
    }),

    getResults: builder.query({
      query: () => "/admin/all/result",
      providesTags: ["Result"]
    }),
    getMyResult: builder.query({
      query: () => "/my-result",
      providesTags: ["Result"]
    }),

  })
});

export const { useAddBulkResultMutation, useGetResultsQuery,useGetMyResultQuery } = resultApi;