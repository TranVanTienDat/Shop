import { createSlice } from '@reduxjs/toolkit';

const loading = createSlice({
  name: 'setIsLoading',
  initialState: {
    isLoading: false,
    isLoadingRating: false,
    productID: '',
    isLoadingButton: false,
    isToggleSidebar: false,
    isToggleMenuFilter: false,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsLoadingRating: (state, action) => {
      const { isLoadingRating, productID } = action.payload;
      state.isLoadingRating = isLoadingRating;
      state.productID = productID;
    },
    setIsLoadingButton: (state, action) => {
      const { isLoadingButton } = action.payload;
      state.isLoadingButton = isLoadingButton;
    },
    setToggleSidebar: (state, action) => {
      const { isToggleSidebar } = action.payload;
      state.isToggleSidebar = isToggleSidebar;
    },
    setToggleMenuFilter: (state, action) => {
      const { isToggleMenuFilter } = action.payload;
      state.isToggleMenuFilter = isToggleMenuFilter;
    },
  },
});
export const {
  setIsLoading,
  setIsLoadingRating,
  setIsLoadingButton,
  setToggleSidebar,
  setToggleMenuFilter,
} = loading.actions;
export default loading.reducer;
