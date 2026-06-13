import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subjectApi = createApi({
  reducerPath: "subjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://srm-khaki-eight.vercel.app/api",
    credentials: "include",
  }),
  tagTypes: ["Subject"],

  endpoints: (builder) => ({
    // ✅ ADD
    addSubject: builder.mutation({
      query: (data) => ({
        url: "/add-subject",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subject"],
    }),

    // ✅ GET
    getSubjects: builder.query({
      query: () => "/subjects",
      providesTags: ["Subject"],
    }),

    // ✅ UPDATE
    updateSubject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateSubject/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Subject"],
    }),

    // ✅ DELETE
    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `/deleteSubject/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subject"],
    }),
  }),
});

export const {
  useAddSubjectMutation,
  useGetSubjectsQuery,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectApi;



