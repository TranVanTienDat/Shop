import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    gender: '',
    dateBirth: {
      day: '1',
      month: '1',
      year: '1980',
    },
    avatar: '',
    status: false,
    _id: '',
    isModal: false,
  },

  reducers: {
    setInfo(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.phoneNumber = action.payload.phoneNumber;
      state.gender = action.payload.gender;
      state.avatar = action.payload.avatar;
      state.dateBirth = action.payload.dateBirth;
      state.status = action.payload.status;
      state._id = action.payload._id;
    },
    setStatus(state, action) {
      state.status = action.payload.status;
      state.avatar = '';
    },
    setIsModal(state, action) {
      const { isModal } = action.payload;
      state.isModal = isModal;
    },
    uploadImage(state, action) {
      state.image = action.payload.image;
    },
  },
});
export const {
  setInfo,
  setStatus,
  addAddress,
  addInfoFirebase,
  setIsModal,
  uploadImage,
} = user.actions;
export default user.reducer;
