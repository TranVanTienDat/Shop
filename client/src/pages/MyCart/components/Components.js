import {
  faComment,
  faHeart,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cartApi from '~/api/modules/cart.api';
import orderApi from '~/api/modules/order.api';
import Button from '~/components/Button/Button';
import { LoadingAnimate } from '~/components/Loading/LoadingGlobal';
import { errMes, success } from '~/constants/ToastMessage/ToastMessage';
import { sidebarCheckout } from '~/constants/sidebarCheckout';
import { formatPrice } from '~/utils/func';
import { onBuy } from '~/store/slice/BuyProductSlice';
import {
  setIsLoadingButton,
  setIsLoadingRating,
} from '~/store/slice/loadingSlice';
import { removeCartProduct } from '~/store/slice/myCartSlice';
import { myCart } from '~/store/slice/selector';
import styles from './Components.module.scss';
const cx = classNames.bind(styles);
const buttonLabels = {
  1: 'Hủy Đơn Hàng',
  2: 'Liên hệ vận chuyển',
  3: 'Liên hệ vận chuyển',
  4: 'Đánh giá sản phẩm',
};

export const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listOrderProduct, setListOrderProduct] = useState([]);
  const [typeStatus, setTypeStatus] = useState(0);
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    const getOrder = async () => {
      setIsLoading(true);
      const { res, err } = await orderApi.getOrderProducts({ typeStatus });
      if (res) {
        setListOrderProduct(res);
      }
      if (err) {
        errMes(err.message);
      }
      setIsLoading(false);
    };
    getOrder();
  }, [typeStatus]);

  const orderCancel = async (_id, typeStatus) => {
    const body = { _id, typeStatus };
    dispatch(setIsLoadingButton({ isLoadingButton: true }));
    const { res, err } = await orderApi.cancelOrder(body);
    dispatch(setIsLoadingButton({ isLoadingButton: false }));
    if (res) {
      success('hủy hàng thành công');
    }

    if (err) {
      errMes(err.message);
    }
  };

  const handleButtonClick = (data) => {
    switch (data.status.typeStatus) {
      case 1:
        return orderCancel(data._id, 5);
      case 4:
        return dispatch(
          setIsLoadingRating({
            isLoadingRating: true,
            productID: data.store.productID,
          })
        );
      default:
        return null;
    }
  };
  return (
    <div className={cx('wrapper__1')}>
      <h1 className={cx('heading')}>Kiểm tra sản phẩm</h1>
      <div className={cx('container')}>
        <div className={cx('sidebar')}>
          {sidebarCheckout.map((data, i) => {
            return (
              <div
                key={i}
                className={cx('box', typeStatus === i ? 'box--active' : '')}
                onClick={() => setTypeStatus(i)}
              >
                <h4 className={cx('title')}>{data.title}</h4>
                <FontAwesomeIcon icon={data.icon} className={cx('icon')} />
              </div>
            );
          })}
        </div>
        <div className={cx('content')}>
          <div className={cx('list')}>
            {!isLoading ? (
              listOrderProduct.map((data, i) => {
                return (
                  <div key={i} className={cx('product')}>
                    <div className={cx('product__flex')}>
                      <div className={cx('flex__quantity')}>
                        <div key={i} className={cx('flex__info')}>
                          <img
                            src={data.store.productImage}
                            className={cx('img')}
                            alt=""
                          />
                          <div className={cx('data')}>
                            <h5 className={cx('name')}>
                              {data.store.productName}
                            </h5>
                            <span className={cx('type')}>
                              {`Phân loại: ${
                                data.store.productType !==
                                data.store.productValue
                                  ? `${data.store.productType}, ${data.store.productValue}`
                                  : data.store.productType
                              }`}
                            </span>
                            <span
                              className={cx('quantity')}
                            >{`x${data.store.productQuantity}`}</span>
                          </div>
                        </div>
                      </div>
                      <div className={cx('flex__status')}>
                        <span className={cx('status__delivery')}>
                          {data.status.typeText}
                        </span>
                        <span
                          className={cx('status__price')}
                        >{`đ${formatPrice.format(data.totalPay)}`}</span>
                        <span className={cx('status__contact')}>
                          <FontAwesomeIcon
                            icon={faComment}
                            className={cx('icon')}
                          />
                          Liên hệ
                        </span>
                      </div>
                    </div>
                    <div className={cx('product__flex', 'product__flex--line')}>
                      <div className={cx('box')}>
                        <span className={cx('address')}>{data.address}</span>
                      </div>

                      {data.status.typeStatus !== 5 && (
                        <Button large onClick={() => handleButtonClick(data)}>
                          {buttonLabels[data.status.typeStatus]}
                        </Button>
                      )}
                    </div>

                    <div className={cx('expected')}>
                      {data.status.typeStatus !== 5 ? (
                        <>
                          <h4 className={cx('time')}>
                            {`Đơn hàng sẽ được chuẩn bị và chuyển đi trước ${data.transferTime}`}
                          </h4>
                          <h4 className={cx('time')}>
                            {`Dự kiến ngày nhận hàng ${data.receivingTime}`}
                          </h4>
                        </>
                      ) : (
                        <Button
                          large
                          onClick={() =>
                            navigate(
                              `/detail-product/${data.store.productName}/${data.store.productID}`
                            )
                          }
                        >
                          Mua lại
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <LoadingAnimate />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ShoppingCart = () => {
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
    <div className={cx('wrapper__2')}>
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
                <LoadingAnimate />
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
};
