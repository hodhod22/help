import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set(
        "Accept-Language",
        localStorage.getItem("i18nextLng") || "sv",
      );
      return headers;
    },
  }),
  tagTypes: ["User", "Messages"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getMe: builder.query({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
    // 🆕 Hämta användarens egna meddelanden
    getUserMessages: builder.query({
      query: () => "/contact/my", // ← viktigt: rätt endpoint
      providesTags: ["Messages"],
    }),
    // 🆕 Uppdatera profil
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: "/users/profile", // ← viktigt: rätt endpoint
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    // Admin: hämta alla meddelanden
    getAllMessages: builder.query({
      query: () => "/admin/messages",
      providesTags: ["Messages"],
    }),
    // Admin: hämta alla användare
    getAllUsers: builder.query({
      query: () => "/admin/users",
      providesTags: ["User"],
    }),
    // Admin: uppdatera användarroll
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/admin/users/${userId}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useGetUserMessagesQuery,
  useUpdateProfileMutation,
  useGetAllMessagesQuery,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} = userApi;
