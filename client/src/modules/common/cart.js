import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const {
  reducer,
  actions: { addToCart, changeQty, removeItem, clearCart },
} = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      if (!state.cartItems.length) state.cartItems.push({ ...payload, count: 1 });
      else
        state.cartItems = state.cartItems.some((product) => product._id === payload._id)
          ? state.cartItems.map((product) =>
              product._id === payload._id ? { ...product, count: product.count + 1 } : product
            )
          : [...state.cartItems, { ...payload, count: 1 }];
    },
    changeQty: (state, { payload }) => {
      state.cartItems = state.cartItems.map((product) =>
        product._id === payload._id ? { ...product, count: payload.count } : product
      );
    },
    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((product) => product._id !== payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export { addToCart, changeQty, removeItem, clearCart };

export default reducer;
