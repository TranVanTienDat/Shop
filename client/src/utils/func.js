import { warning, success } from '~/constants/ToastMessage/ToastMessage';

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
