import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://srm-khaki-eight.vercel.app/api", // apna backend url
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Student"],
  endpoints: (builder) => ({

    // ✅ GET ALL STUDENTS
    getStudents: builder.query({
      query: () => "/getAllStudents",
      providesTags: ["Student"]
    }),

    // ✅ ADD STUDENT
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/addStudent",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Student"]
    }),

    // ✅ UPDATE STUDENT
    updateStudent: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/updateStudent/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Student"]
    }),

    // ✅ DELETE STUDENT
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/deleteStudent/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Student"]
    })
  })
});

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation
} = studentApi;