import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subjectApi = createApi({
  reducerPath: "subjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include"
  }),
  tagTypes: ["Subject"],
  endpoints: (builder) => ({
    addSubject: builder.mutation({
      query: (data) => ({
        url: "/add-subject",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Subject"]
    }),
    getSubjects: builder.query({
      query: () => "/subjects",
      providesTags: ["Subject"]
    })
  })
});

export const {
  useAddSubjectMutation,
  useGetSubjectsQuery
} = subjectApi;