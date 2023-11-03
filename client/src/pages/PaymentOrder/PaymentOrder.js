/* eslint-disable react-hooks/exhaustive-deps */
import {
  faBagShopping,
  faDolly,
  faLocationPinLock,
  faMoneyBill1Wave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '~/Layouts/DefaultLayOut/Footer/Footer';
import orderApi from '~/api/modules/order.api';
import Button from '~/components/Button/Button';
import InputVoucher from '~/components/InputVoucher/InputVoucher';
import {
  errMes,
  success,
  warning,
} from '~/constants/ToastMessage/ToastMessage';
import { formatPrice } from '~/hook/func';
import { setIsModal } from '~/store/slice/infoDataUser';
import { setIsLoadingButton } from '~/store/slice/loadingSlice';
import { buySelector, userData, voucherSelector } from '~/store/slice/selector';
import styles from './PaymentOrder.module.scss';
const cx = classNames.bind(styles);
function PaymentOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, phoneNumber, address } = useSelector(userData);
  const { discount, transport, productID } = useSelector(voucherSelector);
  const productSelector = useSelector(buySelector);
  const [addressUser, setAddressUser] = useState('');
  const [product, setProduct] = useState([]);
  const [voucher, setVoucher] = useState({});
  useEffect(() => {
    const data = productSelector.map((item) => {
      const price = {
        priceTransport: 35000,
        priceProduct: item.productPrice * item.productQuantity,
        pay: item.productPrice * item.productQuantity + 35000,
        discount: 0,
        transport: 0,
      };
      return { data: item, price };
    });
    setProduct(data);
  }, [productSelector]);

  // set address user
  useEffect(() => {
    setAddressUser(`${name}(${phoneNumber})--${address}`);
  }, [name, phoneNumber, address]);

  // set voucher
  useEffect(() => {
    setVoucher({ discount, transport, productID });
  }, [transport, discount, productID]);

  // add voucher
  useEffect(() => {
    const { discount, transport, productID } = voucher;
    if (discount > 0 || transport > 0) {
      let updatedProducts = [...product];
      updatedProducts.forEach((product) => {
        if (product.data.productID === productID) {
          product.price.pay =
            product.price.priceProduct +
            product.price.priceTransport -
            (discount + transport);
          product.price.discount = discount;
          product.price.transport = transport;
        }
      });
      setProduct(updatedProducts);
    }
  }, [voucher]);

  const handleOnchangeAddress = () => {
    dispatch(setIsModal({ isModal: true }));
  };

  const handleOnBuy = async (data) => {
    if (!name && !phoneNumber && !address) {
      warning('Cập nhật địa chỉ nhận hàng');
      return;
    }

    const body = {
      store: data.data,
      totalPay: data.price.pay,
    };
    dispatch(setIsLoadingButton({ isLoadingButton: true }));
    const { res, err } = await orderApi.orderProduct(body);
    dispatch(setIsLoadingButton({ isLoadingButton: false }));

    if (res) {
      success('Đã mua thành công');
      navigate('/check-out');
    }
    if (err) {
      errMes(err.message);
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <h1 className={cx('heading')}>Thanh toán</h1>
        <div className={cx('container')}>
          {product.map((data, i) => {
            return (
              <div key={i} className={cx('product')}>
                <div className={cx('product__flex')}>
                  <div className={cx('flex__quantity')}>
                    <div className={cx('flex__info')}>
                      <img
                        src={data.data.productImage}
                        className={cx('img')}
                        alt=""
                      />
                      <div className={cx('data')}>
                        <h5 className={cx('name')}>{data.data.productName}</h5>
                        <span className={cx('type')}>
                          {`Phân loại hàng: ${
                            data.data.productType !== data.data.productValue
                              ? `${data.data.productType}, ${data.data.productValue}`
                              : data.data.productType
                          }`}
                        </span>
                        <span className={cx('quantity')}>{`x${
                          data.data.productQuantity
                        }, [${formatPrice.format(
                          data.data.productPrice
                        )}đ]`}</span>
                      </div>
                    </div>

                    <div className={cx('price')}>
                      <span className={cx('price__pay')}>
                        {`Số tiền thanh toán:  ${formatPrice.format(
                          data.price.priceProduct
                        )}đ`}
                      </span>
                    </div>
                  </div>
                  <InputVoucher id={data.data.productID} />
                </div>
                <div className={cx('detail__info', 'product__flex--line')}>
                  <div className={cx('address')}>
                    <div className={cx('title')}>
                      <FontAwesomeIcon
                        className={cx('icon')}
                        icon={faLocationPinLock}
                      />
                      <h3 className={cx('text')}>Địa chỉ nhận hàng</h3>
                    </div>
                    <div className={cx('value')}>
                      <span className={cx('value__text')}>{addressUser}</span>
                      <Button onClick={handleOnchangeAddress} onChange>
                        Thay đổi
                      </Button>
                    </div>
                  </div>

                  <div className={cx('transport')}>
                    <div className={cx('title')}>
                      <FontAwesomeIcon className={cx('icon')} icon={faDolly} />
                      <h3 className={cx('text')}>Đơn vị vận chuyển</h3>
                    </div>
                    <div className={cx('value')}>
                      <span className={cx('value__text')}>
                        Vận chuyển nhanh
                      </span>
                      <span className={cx('price')}>{`${formatPrice.format(
                        data.price.priceTransport
                      )}đ`}</span>
                    </div>
                  </div>
                </div>
                <div className={cx('payment', 'product__flex--line')}>
                  <div className={cx('payment__method')}>
                    <div className={cx('title')}>
                      <FontAwesomeIcon
                        className={cx('icon')}
                        icon={faBagShopping}
                      />
                      <h3 className={cx('text')}>Phương thức thanh toán</h3>
                    </div>
                    <div className={cx('value')}>
                      <span className={cx('value__text')}>
                        Thanh toán khi nhận hàng
                      </span>
                      <Button onChange>Thay đổi</Button>
                    </div>
                  </div>
                  <div className={cx('payment__method')}>
                    <div className={cx('title')}>
                      <FontAwesomeIcon
                        className={cx('icon')}
                        icon={faMoneyBill1Wave}
                      />
                      <h3 className={cx('text')}>Tổng chi phí thanh toán</h3>
                    </div>
                    <div className={cx('flex')}>
                      <div className={cx('value')}>
                        <span className={cx('name')}>Tổng tiền hàng</span>
                        <span className={cx('price')}>{`${formatPrice.format(
                          data.price.priceProduct
                        )}đ`}</span>
                      </div>
                      <div className={cx('value')}>
                        <span className={cx('name')}>Phí vận chuyển</span>
                        <span className={cx('price')}>
                          {`${formatPrice.format(data.price.priceTransport)}đ`}
                        </span>
                      </div>

                      {/* voucher */}
                      <div className={cx('value')}>
                        <span className={cx('name')}>Voucher giảm giá</span>
                        <div className={cx('deduction')}>
                          {data.price.discount > 0 && (
                            <span className={cx('deduction__value')}>
                              - {formatPrice.format(data.price.discount)}
                              <div className={cx('left')}></div>
                            </span>
                          )}
                          {data.price.transport > 0 && (
                            <span className={cx('deduction__value')}>
                              - {formatPrice.format(data.price.transport)}
                              <div className={cx('left')}></div>
                            </span>
                          )}
                        </div>
                      </div>
                      {/* voucher */}

                      <div className={cx('value')}>
                        <span className={cx('name')}>Tổng thanh toán</span>
                        <span className={cx('price')}>{`${formatPrice.format(
                          data.price.pay
                        )}đ`}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx('button')}>
                  <Button large onClick={() => handleOnBuy(data)}>
                    Đặt hàng
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PaymentOrder;
