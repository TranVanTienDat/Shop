import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    gender: '',
    avatar: '',
    status: false,
    _id: '',
    isModal: false,
  },

  reducers: {
    addInfoDataUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.phoneNumber = action.payload.phoneNumber;
      state.gender = action.payload.gender;
      state.avatar = action.payload.avatar;
      state.status = action.payload.status;
      state._id = action.payload._id;
    },
    setStatus(state, action) {
      state.status = action.payload.status;
      state._id = action.payload._id;
    },
    addInfoFirebase(state, action) {
      const { address, phoneNumber, gender } = action.payload;
      state.address = address;
      state.phoneNumber = phoneNumber;
      state.gender = gender;
    },
    addAddress(state, action) {
      const { address, phoneNumber, isModal } = action.payload;
      state.address = address;
      state.phoneNumber = phoneNumber;
      state.isModal = isModal;
    },
    addIsModal(state, action) {
      const { isModal } = action.payload;
      state.isModal = isModal;
    },
    uploadImage(state, action) {
      state.image = action.payload.image;
    },
  },
});
export const {
  addInfoDataUser,
  setStatus,
  addAddress,
  addInfoFirebase,
  addIsModal,
  uploadImage,
} = user.actions;
export default user.reducer;
