import { api } from '../../modules/app/api';

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query({
      query: () => ({
        url: '/v1/orders?userType=admin',
        method: 'get',
      }),
    }),
    addOrder: builder.mutation({
      query: (body) => ({
        url: '/v1/orders?userType=admin',
        method: 'post',
        body,
      }),
    }),
  }),
});

export const { useOrdersQuery, useAddOrderMutation } = ordersApi;
