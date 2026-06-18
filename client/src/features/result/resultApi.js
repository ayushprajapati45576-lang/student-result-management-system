// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const resultApi = createApi({
//   reducerPath: "resultApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://srm-khaki-eight.vercel.app/api",
//     credentials: "include"
//   }),
//   tagTypes: ["Result"],

//   endpoints: (builder) => ({

//     // ✅ ADD BULK RESULT
//     addBulkResult: builder.mutation({
//       query: (data) => ({
//         url: "/admin/result/bulk",  // 👈 apna route check kar lena
//         method: "POST",
//         body: data
//       }),
//       invalidatesTags: ["Result"]
//     }),

//     getResults: builder.query({
//       query: () => "/admin/all/result",
//       providesTags: ["Result"]
//     }),
//     getMyResult: builder.query({
//       query: () => "/my-result",
//       providesTags: ["Result"]
//     }),

//   })
// });

// export const { useAddBulkResultMutation, useGetResultsQuery, useGetMyResultQuery } = resultApi;






import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resultApi = createApi({
  reducerPath: "resultApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://srm-khaki-eight.vercel.app/api",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Result"],

  endpoints: (builder) => ({

    // ✅ ADD BULK RESULT
    addBulkResult: builder.mutation({
      query: (data) => ({
        url: "/admin/result/bulk",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Result"],
    }),

    // ✅ GET ALL RESULTS
    getResults: builder.query({
      query: () => "/admin/all/result",

      providesTags: ["Result"],
    }),

    // ✅ GET MY RESULT
    getMyResult: builder.query({
      query: () => "/my-result",

      providesTags: ["Result"],
    }),

    // ✅ DELETE RESULT
    deleteResult: builder.mutation({
      query: (id) => ({
        url: `/result/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Result"],
    }),

    // ✅ UPDATE RESULT
    updateResult: builder.mutation({
      query: ({ id, marksObtained }) => ({
        url: `/result/${id}`,
        method: "PUT",
        body: { marksObtained },
      }),

      invalidatesTags: ["Result"],
    }),

  }),
});

export const {
  useAddBulkResultMutation,
  useGetResultsQuery,
  useGetMyResultQuery,
  useDeleteResultMutation,
  useUpdateResultMutation,
} = resultApi;