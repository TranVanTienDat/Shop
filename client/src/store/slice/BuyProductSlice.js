import { createSlice } from '@reduxjs/toolkit';

const buyProductSlice = createSlice({
  name: 'buyProductSlice',
  initialState: [],

  reducers: {
    onBuy(state, action) {
      return action.payload;
    },
  },
});
export const { onBuy } = buyProductSlice.actions;
export default buyProductSlice.reducer;
