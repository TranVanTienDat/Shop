import propTypes from 'prop-types';
import Container from './Container/Container';
import Footer from './Footer/Footer';
import { useEffect } from 'react';
import Header from './Header/Header';
import Loading from './Loading/Loading';
import { getCart } from '~/api/cartApi';
import { useDispatch } from 'react-redux';
import { getCartProduct } from '~/store/slice/myCart';
function DefaultLayOut({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [children]);
  useEffect(() => {
    const fetchLitCart = async () => {
      const { res } = await getCart();
      if (res) {
        dispatch(getCartProduct(res.data.cart));
      }
    };
    fetchLitCart();
  });
  return (
    <>
      <Header />
      <Loading />
      <Container children={children} />
      <Footer />
    </>
  );
}

DefaultLayOut.propTypes = {
  children: propTypes.node,
};

export default DefaultLayOut;
