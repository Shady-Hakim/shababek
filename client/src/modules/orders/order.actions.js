import { api } from '../../modules/app/api';

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query({
      query: () => ({
        url: '/v1/orders?userType=admin',
        method: 'get',
      }),
    }),
  }),
});

export const { useOrdersQuery } = ordersApi;
