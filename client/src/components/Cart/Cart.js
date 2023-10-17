import classNames from 'classnames/bind';
// icon
import {
  faClipboardCheck,
  faTrashArrowUp,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeCart } from '~/api/cartApi';
import images from '~/assets/images';
import { err, success } from '~/constants/ToastMessage/ToastMessage';
import { formatPrice } from '~/hook/func';
import { removeCartProduct } from '~/store/slice/myCart';
import { myCart } from '~/store/slice/selector';
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
    const { res, error } = await removeCart(_id);
    if (res) {
      success('Đã xóa sản phẩm');
      dispatch(removeCartProduct(_id));
    }
    if (error) {
      err(error.message);
    }
  };

  return (
    <div className={cx('cart', isAnimate ? 'animate--open' : 'animate--close')}>
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
            <Button large onClick={() => navigate('/my-cart')}>
              Đến giỏ hàng
            </Button>
          </div>
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
