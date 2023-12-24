import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const storedToken = Cookies.get('userToken');
const isAuthenticated = storedToken !== undefined ? !!storedToken : false;

const initialState = {
  user: null,
  isAuthenticated: isAuthenticated,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      if (action.payload?.token) Cookies.set('userToken', action.payload.token, { expires: 7 });
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove('userToken');
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const selectUser = (state) => state.auth?.user;
export const selectIsAuthenticated = (state) => state.auth?.isAuthenticated;

export default authSlice.reducer;
