import { faHeart, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeCart } from '~/api/cartApi';
import Button from '~/components/Button/Button';
import { success, warning } from '~/constants/ToastMessage/ToastMessage';
import { Animate } from '~/features/Auth/Sign/LogIn';
import { formatPrice } from '~/hook/func';
import { onBuy } from '~/store/slice/BuyProductSlice';
import { removeCartProduct } from '~/store/slice/myCart';
import { myCart } from '~/store/slice/selector';
import styles from './ShoppingCart.module.scss';

const cx = classNames.bind(styles);

function ShoppingCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myCartSelector = useSelector(myCart);

  const [listMyCart, setListMyCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState({ total: 0, pay: 0 });

  // tính giá thành thanh toán
  useEffect(() => {
    setListMyCart(myCartSelector);
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
    const { res, error } = await removeCart(_id);
    if (res) {
      dispatch(removeCartProduct(_id));
      success('Đã xóa sản phẩm');
    }
    if (error) {
      warning(error.message);
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
            {listMyCart.length > 0 ? (
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
                      <span className={cx('name')}>{item.productName}</span>
                      <div className={cx('flex')}>
                        <div className={cx('title')}>
                          <span className={cx('text')}>Kiểu</span>
                          <span className={cx('text')}>Quantity</span>
                        </div>
                        <div className={cx('title')}>
                          <span className={cx('text')}>:</span>
                          <span className={cx('text')}>:</span>
                        </div>
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
                            {item.productQuantity}
                          </div>
                        </div>
                      </div>
                      <div className={cx('total')}>
                        <span className={cx('price')}>
                          {formatPrice.format(item.productPrice)}
                        </span>
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

              <div className={cx('total')}>
                <div className={cx('total__sub')}>
                  <span className={cx('title')}>Tổng thanh toán</span>
                  <span className={cx('value')}>
                    {formatPrice.format(totalPrice.total)}
                  </span>
                </div>

                <div className={cx('pay')}>
                  <span className={cx('title')}>Số tiền thanh toán</span>
                  <span className={cx('value')}>
                    {formatPrice.format(totalPrice.pay)}
                  </span>
                </div>
              </div>
            </div>
            <div className={cx('button')}>
              <Button large onClick={handleOnBuy}>
                Buy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
