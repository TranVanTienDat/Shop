import { createSlice } from '@reduxjs/toolkit';

const voucher = createSlice({
  name: 'addVoucher',
  initialState: {
    discount: 0,
    transport: 0,
    status: false,
    productID: '',
  },

  reducers: {
    addVoucher(state, action) {
      state.discount = parseInt(action.payload.discount);
      state.transport = parseInt(action.payload.transport);
      state.status = action.payload.status;
      state.productID = action.payload.productID;
    },
    setStatus(state, action) {
      state.status = action.payload.status;
      state._id = action.payload._id;
    },
  },
});
export const { addVoucher } = voucher.actions;
export default voucher.reducer;
