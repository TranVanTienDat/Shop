import propTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '~/api/modules/auth.api';
import cartApi from '~/api/modules/cart.api';
import Cart from '~/components/Cart/Cart';
import ModalRating from '~/pages/MyCart/components/Checkout/ModalRating/ModalRating';
import { setInfo } from '~/store/slice/infoDataUser';
import { getCartProduct } from '~/store/slice/myCart';
import { userData } from '~/store/slice/selector';
import { setAppState } from '~/store/slice/stateAppSlice';
import { parseDate } from '~/utils/timeConversion';
import SidebarResponsive from '../../features/shop/SideBar/SidebarResponsive/SidebarResponsive';

import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';
function MainLayout() {
  const dispatch = useDispatch();
  const { status } = useSelector(userData);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { res } = await userApi.getInfoUser();
        if (res) {
          const date = parseDate(res.user.dateBirth);
          dispatch(
            setInfo({
              ...res.user,
              status: true,
              dateBirth: date,
            })
          );
        }
      } catch (error) {
        console.log('No users');
      }
    };
    fetchUser();
  }, [dispatch]);
  useEffect(() => {
    const fetchListCart = async () => {
      const { res } = await cartApi.getCart();
      if (res) {
        dispatch(getCartProduct(res?.cart));
      }
    };
    if (status) {
      fetchListCart();
    }
  }, [status, dispatch]);
  return (
    <>
      <SidebarResponsive />
      <Cart />
      <ModalRating />
      <Outlet />
    </>
  );
}
export default MainLayout;

export const PageWrapper = ({ children, state }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (state !== undefined) {
      window.scrollTo(0, 0);
      dispatch(setAppState(state));
    }
  }, [state, dispatch]);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
PageWrapper.propTypes = {
  children: propTypes.node,
};
