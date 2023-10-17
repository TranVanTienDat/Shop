import { createSlice } from '@reduxjs/toolkit';

const productCartSlice = createSlice({
  name: 'myCart',
  initialState: [],
  reducers: {
    getCartProduct: (state, action) => {
      return (state = action.payload);
    },
    addCartProduct: (state, action) => {
      return [...state, action.payload];
    },
    removeCartProduct: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },
  },
});
export const { addCartProduct, getCartProduct, removeCartProduct } =
  productCartSlice.actions;
export default productCartSlice.reducer;
