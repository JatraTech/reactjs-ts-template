import { baseApi } from '@/app/store/api/baseApi'
import type { ContactInquiry } from '../model/types'

export const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    submitContact: build.mutation<void, ContactInquiry>({
      query: (body) => ({
        url: '/core/contact-inquiries/',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useSubmitContactMutation } = contactApi
