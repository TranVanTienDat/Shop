import { createSlice } from '@reduxjs/toolkit';

const userCommentSlice = createSlice({
  name: 'userComment',
  initialState: [],
  reducers: {
    addComment(state, action) {
      return [...state, action.payload];
    },
  },
});
export const { addComment } = userCommentSlice.actions;
export default userCommentSlice.reducer;
