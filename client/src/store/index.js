import { configureStore } from '@reduxjs/toolkit';
import myCart from '~/store/slice/myCart';
import loadingSlice from './slice/loadingSlice';
import searchParamsSlice from './slice/searchParamsSlice';
import infoDataUser from './slice/infoDataUser';
import voucherSlice from './slice/voucherSlice';
import BuyProductSlice from './slice/BuyProductSlice';
import ratingSlice from './slice/ratingSlice';
import stateAppSlice from './slice/stateAppSlice';
export const store = configureStore({
  reducer: {
    myCart: myCart,
    setGlobalLoading: loadingSlice,
    searchParams: searchParamsSlice,
    userData: infoDataUser,
    voucher: voucherSlice,
    buyProduct: BuyProductSlice,
    ratingUser: ratingSlice,
    stateApp: stateAppSlice,
  },
});
