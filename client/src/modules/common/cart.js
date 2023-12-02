import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const {
  reducer,
  actions: { addToCart, changeQty },
} = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      if (!state.cartItems.length) state.cartItems.push({ ...payload, qty: 1 });
      else
        state.cartItems = state.cartItems.some((product) => product.id === payload.id)
          ? state.cartItems.map((product) =>
              product.id === payload.id ? { ...product, qty: product.qty + 1 } : product
            )
          : [...state.cartItems, { ...payload, qty: 1 }];
    },
    changeQty: (state, { payload }) => {
      state.cartItems = state.cartItems.map((product) =>
        product.id === payload.id ? { ...product, qty: payload.qty } : product
      );
    },
  },
});

export { addToCart, changeQty };

export default reducer;
