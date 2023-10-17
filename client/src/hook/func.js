import { setStatus } from '~/store/slice/infoDataUser';
import { warning, success } from '~/constants/ToastMessage/ToastMessage';

// Log out user
export const handleLogOut = async (id, logOut, dispatch, navigate) => {
  try {
    if (id === 'firebase') {
      await logOut();
      dispatch(setStatus({ status: false, id: '' }));
    } else {
      localStorage.removeItem('access');
      dispatch(setStatus({ status: false, id: '' }));
    }
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

// Check if there are products in the cart
export const checkProductCart = (ListProduct, product, dispatch, addCart) => {
  const isCheck = ListProduct.some((item) => item.id === product.id);
  if (!isCheck) {
    dispatch(addCart(product));
    success('The product has been added');
  } else {
    warning('Products already in the cart');
  }
};

export let formatPrice = Intl.NumberFormat('en-US');
