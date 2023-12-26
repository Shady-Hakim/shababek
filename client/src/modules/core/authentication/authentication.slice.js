import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { authenticationApi } from './authentication.action';

const initialState = {
  admin: undefined,
  accessToken: undefined,
  authenticated: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action) => {
      state.admin = action.payload.admin;
      state.accessToken = action.payload.accessToken || state.accessToken;
      state.authenticated = true;
    },
    removeAuthenticatedUser: (state) => {
      state.admin = undefined;
      state.accessToken = undefined;
      state.authenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          authenticationApi.endpoints.login.matchFulfilled,
          authenticationApi.endpoints.create.matchFulfilled,
          authenticationApi.endpoints.readMe.matchFulfilled
        ),
        (state, action) => {
          state.admin = action.payload.admin;
          state.accessToken = action.payload.accessToken;
          state.authenticated = true;
          Cookies.set('userToken', action.payload.token);
        }
      )
      .addMatcher(
        isAnyOf(
          authenticationApi.endpoints.logout.matchFulfilled,
          authenticationApi.endpoints.readMe.matchRejected,
          authenticationApi.endpoints.logout.matchRejected,
          authenticationApi.endpoints.create.matchRejected,
          authenticationApi.endpoints.login.matchRejected
        ),
        (state) => {
          state.admin = undefined;
          state.accessToken = undefined;
          state.authenticated = false;
          Cookies.remove('userToken');
        }
      );
  },
});

export const { setAuthenticatedUser, removeAuthenticatedUser } = authenticationSlice.actions;
