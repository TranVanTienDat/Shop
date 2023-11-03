import { createSlice } from '@reduxjs/toolkit';

const ratingSlice = createSlice({
  name: 'ratingSlice',
  initialState: {
    rating: 5,
  },
  reducers: {
    setRating(state, action) {
      const { rating } = action.payload;
      state.rating = rating;
    },
  },
});
export const { setRating } = ratingSlice.actions;
export default ratingSlice.reducer;
