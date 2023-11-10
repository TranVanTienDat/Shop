import { faHeart, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cartApi from '~/api/modules/cart.api';
import Button from '~/components/Button/Button';
import { errMes, success } from '~/constants/ToastMessage/ToastMessage';
import { Animate } from '~/features/Auth/Sign/SignIn';
import { formatPrice } from '~/hook/func';
import { onBuy } from '~/store/slice/BuyProductSlice';
import { removeCartProduct } from '~/store/slice/myCart';
import { myCart } from '~/store/slice/selector';
import styles from './ShoppingCart.module.scss';
import { setIsLoadingButton } from '~/store/slice/loadingSlice';

const cx = classNames.bind(styles);

function ShoppingCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myCartSelector = useSelector(myCart);

  const [listMyCart, setListMyCart] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [totalPrice, setTotalPrice] = useState({ total: 0, pay: 0 });

  useEffect(() => {
    setIsLoading(true);
    setListMyCart(myCartSelector);
    setIsLoading(false);
  }, [myCartSelector]);

  useEffect(() => {
    const price = listMyCart
      .filter((item) => item.productCheck === true)
      .reduce(
        (accumulator, currentValue) =>
          accumulator +
          currentValue.productPrice * currentValue.productQuantity,
        0
      );
    setTotalPrice({ total: price, pay: price });
  }, [listMyCart, totalPrice.total]);

  const handleOnChange = (i) => {
    const updatedListMyCart = [...listMyCart];
    const updatedItem = { ...updatedListMyCart[i] };

    updatedItem.productCheck = !updatedItem.productCheck;
    updatedListMyCart[i] = updatedItem;

    setListMyCart(updatedListMyCart);
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

  const handleOnBuy = () => {
    const list = listMyCart.filter((data) => data.productCheck);
    if (list.length > 0) {
      dispatch(onBuy(list));
      navigate('/payment-product');
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <h1 className={cx('heading')}>Giỏ hàng</h1>

        <div className={cx('container')}>
          <div className={cx('list')}>
            {!isLoading > 0 ? (
              listMyCart.map((item, i) => {
                return (
                  <div key={i} className={cx('product')}>
                    <img className={cx('img')} src={item.productImage} alt="" />
                    <input
                      type="checkbox"
                      checked={item.productCheck}
                      value={item.productCheck}
                      onChange={() => handleOnChange(i)}
                      className={cx('check')}
                    />
                    <div className={cx('info')}>
                      <div className={cx('name')}>{item.productName}</div>
                      <div className={cx('flex')}>
                        <div className={cx('title')}>
                          <span className={cx('text')}>
                            {item.productType}
                            {item.productValue ? (
                              <span
                                style={{ color: '#f86338' }}
                              >{`( size: ${item.productValue})`}</span>
                            ) : (
                              ''
                            )}
                          </span>
                          <div className={cx('text')}>
                            {`x${item.productQuantity}`}
                          </div>
                        </div>
                      </div>
                      <div className={cx('total')}>
                        <span className={cx('price')}>
                          {formatPrice.format(item.productPrice)}
                        </span>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className={cx('mobile__icon-remote')}
                          onClick={() => handleRemote(item._id)}
                        />
                        <div className={cx('button')}>
                          <Button
                            leftIcon
                            color
                            icon={<FontAwesomeIcon icon={faTrashCan} />}
                            onClick={() => handleRemote(item._id)}
                          />
                          <Button
                            outline
                            icon={<FontAwesomeIcon icon={faHeart} />}
                          >
                            Wishlist
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={cx('loading')}>
                <Animate />
              </div>
            )}
          </div>

          <div className={cx('check-out')}>
            <div className={cx('cart-total')}>
              <span className={cx('name')}>Thanh toán giỏ hàng</span>
              <div className={cx('pay')}>
                <span className={cx('title')}>tổng tiền hàng</span>
                <span className={cx('value')}>
                  {formatPrice.format(totalPrice.pay)}
                </span>
              </div>
            </div>
            <div className={cx('button')}>
              <Button
                large={totalPrice.pay > 0}
                disabled={totalPrice.pay === 0}
                onClick={handleOnBuy}
              >
                Mua
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
