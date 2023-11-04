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
import { parseDate } from '~/utils/timeConversion';
import Container from './Container/Container';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Loading from './Loading/Loading/Loading';
import SidebarResponsive from '../../features/shop/SideBar/SidebarResponsive/SidebarResponsive';
function DefaultLayOut({ children }) {
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
      <Header />
      <SidebarResponsive />
      <Loading />
      <Cart />
      <ModalRating />
      <Container children={children} />
      <Footer />
    </>
  );
}

DefaultLayOut.propTypes = {
  children: propTypes.node,
};

export default DefaultLayOut;
