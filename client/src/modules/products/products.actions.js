import { api } from '../../modules/app/api';

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    categories: builder.query({
      query: () => ({
        url: '/v1/categories?userType=admin',
        method: 'get',
      }),
    }),
  }),
});

export const { useCategoriesQuery } = productsApi;
