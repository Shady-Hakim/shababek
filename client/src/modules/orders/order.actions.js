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
    updateOrder: builder.mutation({
      query: (order) => {
        const { orderId, ...body } = order;

        return {
          url: `/v1/orders/${orderId}?userType=admin`,
          method: 'PATCH',
          body,
        };
      },
    }),
  }),
});

export const { useOrdersQuery, useAddOrderMutation, useUpdateOrderMutation } = ordersApi;
