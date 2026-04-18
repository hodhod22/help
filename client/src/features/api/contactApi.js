import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import i18n from '../../i18n'

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function currentLangHeader() {
  const raw = i18n.language || 'sv'
  const base = String(raw).split('-')[0]
  return ['en', 'sv', 'ar'].includes(base) ? base : 'sv'
}

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Accept-Language', currentLangHeader())
      return headers
    },
  }),
  endpoints: (builder) => ({
    submitContact: builder.mutation({
      query: (body) => ({
        url: '/contact',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSubmitContactMutation } = contactApi
