import { api } from '../../app/api';

export const authenticationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (data) => ({
        url: '/v1/admins?userType=admin',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/v1/admins/login?userType=guest',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'v1/admins/logout?userType=admin',
        method: 'POST',
      }),
    }),
    readMe: builder.mutation({
      query: () => ({
        url: 'v1/admins/me?userType=admin',
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateMutation, useLoginMutation, useLogoutMutation, useReadMeMutation } = authenticationApi;
