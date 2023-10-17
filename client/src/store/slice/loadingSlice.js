import { createSlice } from '@reduxjs/toolkit';

const loading = createSlice({
  name: 'setIsLoading',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setIsLoading } = loading.actions;
export default loading.reducer;
