import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://srm-khaki-eight.vercel.app/api",
    credentials: "include",
  }),
  tagTypes: ["Class"],

  endpoints: (builder) => ({

    // ✅ Create Class
    addClass: builder.mutation({
      query: (data) => ({
        url: "/addClass",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Class"],
    }),

    // ✅ Get All Classes
    getClasses: builder.query({
      query: () => "/allClass",
      providesTags: ["Class"],
    }),

    // ✅ Delete Class
    deleteClass: builder.mutation({
      query: (id) => ({
        url: `/deleteClass/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Class"],
    }),

    // ✅ Update Class (FIXED)
    updateClass: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateClass/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Class"],
    }),

  }),
});

export const {
  useAddClassMutation,
  useGetClassesQuery,
  useDeleteClassMutation,
  useUpdateClassMutation,
} = classApi;
