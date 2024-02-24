import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  table: null,
};

const {
  reducer,
  actions: { addTable },
} = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addTable: (state, { payload }) => {
      state.table = payload;
    },
  },
});

export { addTable };

export default reducer;
