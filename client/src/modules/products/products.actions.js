import { api } from '../../modules/app/api';

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    categories: builder.query({
      query: () => ({
        url: '/v1/categories?userType=admin',
        method: 'get',
      }),
    }),
    products: builder.mutation({
      query: (categoryId) => ({
        url: `/v1/products?userType=admin&category=${categoryId}&isActive=true`,
        method: 'get',
      }),
    }),
    addCategory: builder.mutation({
      query: (category) => ({
        url: '/v1/categories?userType=admin',
        method: 'POST',
        body: category,
      }),
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: '/v1/products?userType=admin',
        method: 'POST',
        body: product,
      }),
    }),
  }),
});

export const { useCategoriesQuery, useProductsMutation, useAddCategoryMutation, useAddProductMutation } = productsApi;
