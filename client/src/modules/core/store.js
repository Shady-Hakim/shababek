import { configureStore } from '@reduxjs/toolkit';

import table from '../common/table';
import cart from '../common/cart';
import { authenticationSlice } from './authentication/authentication.slice';
import { api } from '../app/api';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    authentication: authenticationSlice.reducer,
    table,
    cart,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV === 'production' ? false : true,
});

export default store;
