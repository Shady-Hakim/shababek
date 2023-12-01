import { configureStore } from '@reduxjs/toolkit';

import loader from '../common/loader';
import table from '../common/table';
import cart from '../common/cart';

const store = configureStore({
  reducer: {
    loader,
    table,
    cart,
  },
});

export default store;
