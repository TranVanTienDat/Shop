import { createSlice } from '@reduxjs/toolkit';

const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState: {
    keyword: '',
    price: 0,
    category: '',
  },
  reducers: {
    setKeyword(state, action) {
      const { keyword } = action.payload;
      state.keyword = keyword;
    },
    setPrice(state, action) {
      const { price } = action.payload;
      state.price = price;
    },
    setCategory(state, action) {
      const { category } = action.payload;
      state.category = category;
    },
    setSearch(state, action) {
      const { category, keyword, price } = action.payload;
      state.category = category;
      state.keyword = keyword;
      state.price = price;
    },
  },
});
export const { setCategory, setKeyword, setPrice, setSearch } =
  searchParamsSlice.actions;
export default searchParamsSlice.reducer;
