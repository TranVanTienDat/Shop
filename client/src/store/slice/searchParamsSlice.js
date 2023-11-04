import { createSlice } from '@reduxjs/toolkit';

const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState: {
    keyword: '',
    minPrice: 0,
    maxPrice: 0,
    category: '',
    rating: 0,
  },
  reducers: {
    setKeyword(state, action) {
      const { keyword } = action.payload;
      state.keyword = keyword;
    },
    setPrice(state, action) {
      const { minPrice, maxPrice } = action.payload;
      state.minPrice = minPrice;
      state.maxPrice = maxPrice;
    },
    setCategory(state, action) {
      const { category } = action.payload;
      state.category = category;
    },
    setRating(state, action) {
      const { rating } = action.payload;
      state.rating = rating;
    },
    setSearch(state, action) {
      const { category, keyword, minPrice, maxPrice } = action.payload;
      state.category = category;
      state.keyword = keyword;
      state.minPrice = minPrice;
      state.maxPrice = maxPrice;
    },
  },
});
export const { setCategory, setKeyword, setPrice, setSearch, setRating } =
  searchParamsSlice.actions;
export default searchParamsSlice.reducer;
