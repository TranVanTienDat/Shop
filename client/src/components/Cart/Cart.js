import {
  faClipboardCheck,
  faDeleteLeft,
  faTrashArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cartApi from '~/api/modules/cart.api';
import images from '~/assets/images';
import { errMes, success } from '~/constants/ToastMessage/ToastMessage';
import { setIsLoadingButton } from '~/store/slice/loadingSlice';
import { removeCartProduct } from '~/store/slice/myCart';
import { myCart } from '~/store/slice/selector';
import { formatPrice } from '~/utils/func';
import Button from '../Button/Button';
import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function Cart() {
  const myCartSelector = useSelector(myCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listMyCart, setListMyCart] = useState(null);

  const [isAnimate, setIsAnimate] = useState(false);
  useEffect(() => {
    setListMyCart(myCartSelector);
  }, [myCartSelector]);

  const handleAnimate = () => {
    setIsAnimate(!isAnimate);
  };

  const handleRemote = async (_id) => {
    dispatch(setIsLoadingButton({ isLoadingButton: true }));
    const { res, err } = await cartApi.remoteItemCart({ cartID: _id });
    dispatch(setIsLoadingButton({ isLoadingButton: false }));

    if (res) {
      success('Đã xóa sản phẩm');
      dispatch(removeCartProduct(_id));
    }
    if (err) {
      errMes(err.message);
    }
  };

  return (
    <div className={cx('cart', isAnimate ? 'cart--open' : 'cart--close')}>
      {listMyCart?.length > 0 ? (
        <div className={cx('product')}>
          <h1 className={cx('title')}>Sản phẩm mới thêm</h1>
          {listMyCart.slice(0, 5).map((data, i) => {
            return (
              <div className={cx('item')} key={i}>
                <img
                  className={cx('item__img')}
                  src={data.productImage}
                  alt=""
                />
                <div className={cx('description')}>
                  <div className={cx('name')}>{data.productName}</div>
                  <div className={cx('component')}>
                    <span className={cx('price')}>
                      {formatPrice.format(data.productPrice)}đ
                    </span>
                    <button
                      className={cx('remote')}
                      onClick={() => handleRemote(data._id)}
                    >
                      <FontAwesomeIcon icon={faTrashArrowUp} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className={cx('btn')}>
            <h4 className={cx('number')}>
              {listMyCart?.length} đã được thêm vào
            </h4>
            <Button large onClick={() => navigate('/shopping-cart')}>
              Đến giỏ hàng
            </Button>
          </div>
          <FontAwesomeIcon
            onClick={handleAnimate}
            icon={faDeleteLeft}
            className={cx('mobile__icon-close')}
          />
        </div>
      ) : (
        <div className={cx('no-product')}>
          <h2 className={cx('heading')}>No products</h2>
          <img className={cx('img')} src={images.noProduct} alt="" />
        </div>
      )}
      <div onClick={handleAnimate} className={cx('cart__icon')}>
        <FontAwesomeIcon icon={faClipboardCheck} />

        <span className={cx('total')}>{listMyCart?.length || 0}</span>
      </div>
    </div>
  );
}

export default Cart;
