import { api } from '../../modules/app/api';

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    tables: builder.query({
      query: () => ({
        url: '/v1/tables?userType=admin',
        method: 'get',
      }),
    }),
    tableById: builder.mutation({
      query: (tableId) => ({
        url: `/v1/tables/${tableId}?userType=admin`,
        method: 'get',
      }),
    }),
    removeTable: builder.mutation({
      query: (tableId) => ({
        url: `/v1/tables/${tableId}?userType=admin`,
        method: 'delete',
      }),
    }),
    addTable: builder.mutation({
      query: (table) => ({
        url: '/v1/tables?userType=admin',
        method: 'POST',
        body: table,
      }),
    }),
  }),
});

export const { useTablesQuery, useAddTableMutation, useRemoveTableMutation, useTableByIdMutation } = productsApi;
