import { configureStore } from '@reduxjs/toolkit';

import loader from '../common/loader';
import table from '../common/table';
import cart from '../common/cart';
import authReducer from './slices/authSlice';

import { login } from './api/auth';

const store = configureStore({
  reducer: {
    loader,
    table,
    cart,
    auth: authReducer,
    [login.reducerPath]: login.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(login.middleware),
});

export default store;
