import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_DEV_SERVER_URL;

export const login = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: '/api/v1/admins/login?userType=guest',
          method: 'POST',
          body: credentials,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = login;
