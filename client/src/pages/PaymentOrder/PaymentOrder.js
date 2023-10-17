import {
  faBagShopping,
  faCartFlatbed,
  faLocationPinLock,
  faMoneyBill1Wave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '~/Layouts/DefaultLayOut/Footer/Footer';
import { orderProduct } from '~/api/cartApi';
import Button from '~/components/Button/Button';
import InputVoucher from '~/components/Modal/InputVoucher/InputVoucher';
import { err, success, warning } from '~/constants/ToastMessage/ToastMessage';
import { formatPrice } from '~/hook/func';
import { addIsModal } from '~/store/slice/infoDataUser';
import { buySelector, userData, voucherSelector } from '~/store/slice/selector';
import styles from './PaymentOrder.module.scss';
const cx = classNames.bind(styles);
function PaymentOrder() {
  const dispatch = useDispatch();
  const { name, phoneNumber, address } = useSelector(userData);
  const { discount, transport } = useSelector(voucherSelector);
  const productSelector = useSelector(buySelector);
  const [addressUser, setAddressUser] = useState('');
  const [product, setProduct] = useState([]);
  console.log(product);
  const [payment, setPayment] = useState({
    priceTransport: 0,
    price: 0,
    pay: 0,
  });

  useEffect(() => {
    setProduct(productSelector);
    const price = productSelector.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.productPrice * currentValue.productQuantity,
      0
    );
    setPayment({
      priceTransport: 35000,
      price,
      pay: price + 35000,
    });
  }, [productSelector]);

  useEffect(() => {
    setAddressUser(`${name}(${phoneNumber})-${address}`);
  }, [name, phoneNumber, address]);

  // add voucher
  useEffect(() => {
    if (discount > 0 || transport > 0) {
      const totalPay = payment.pay - discount - transport;

      setPayment((prev) => ({ ...prev, pay: totalPay > 0 ? totalPay : 0 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transport, discount]);

  const handleOnchangeAddress = () => {
    dispatch(addIsModal({ isModal: true }));
  };

  const handleOnBuy = async () => {
    if (name && phoneNumber && address) {
      const body = {
        store: product,
        totalPay: payment.pay,
      };
      const { res, error } = await orderProduct(body);
      if (res) {
        success('Đã mua thành công');
      }
      if (error) {
        err(error.message);
      }
    } else {
      warning('Cập nhật địa chỉ nhận hàng');
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <h1 className={cx('heading')}>Thanh toán</h1>
        <div className={cx('container')}>
          <div className={cx('product')}>
            <div className={cx('product__flex')}>
              <div className={cx('flex__quantity')}>
                {product.map((data, i) => {
                  return (
                    <div key={i} className={cx('flex__info')}>
                      <img
                        src={data.productImage}
                        className={cx('img')}
                        alt=""
                      />
                      <div className={cx('data')}>
                        <h5 className={cx('name')}>{data.productName}</h5>
                        <span className={cx('type')}>
                          {`Phân loại hàng: ${
                            data.productType !== data.productValue
                              ? `${data.productType}, ${data.productValue}`
                              : data.productType
                          }`}
                        </span>
                        <span className={cx('quantity')}>{`x${
                          data.productQuantity
                        }, [${formatPrice.format(data.productPrice)}đ]`}</span>
                      </div>
                    </div>
                  );
                })}
                <div className={cx('price')}>
                  <span className={cx('price__pay')}>
                    {`Số tiền thanh toán:  ${formatPrice.format(
                      payment.price
                    )}đ`}
                  </span>
                </div>
              </div>
              <InputVoucher />
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
                  {addressUser}
                  <button
                    className={cx('button__onchange')}
                    onClick={handleOnchangeAddress}
                  >
                    Thay đổi
                  </button>
                </div>
              </div>

              <div className={cx('transport')}>
                <div className={cx('title')}>
                  <FontAwesomeIcon
                    className={cx('icon')}
                    icon={faCartFlatbed}
                  />
                  <h3 className={cx('text')}>Đơn vị vận chuyển</h3>
                </div>
                <div className={cx('value')}>
                  <span className={cx('name')}>Vận chuyển nhanh</span>
                  <span className={cx('price')}>{`${formatPrice.format(
                    payment.priceTransport
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
                  Thanh toán khi nhận hàng
                  <button className={cx('button__onchange')}>Thay đổi</button>
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
                      payment.price
                    )}đ`}</span>
                  </div>
                  <div className={cx('value')}>
                    <span className={cx('name')}>Phí vận chuyển</span>
                    <span className={cx('price')}>
                      {`${formatPrice.format(payment.priceTransport)}đ`}
                    </span>
                  </div>

                  {/* voucher */}
                  <div className={cx('value')}>
                    <span className={cx('name')}>Voucher giảm giá</span>
                    <div className={cx('deduction')}>
                      {discount > 0 && (
                        <span className={cx('deduction__value')}>
                          - {formatPrice.format(discount)}
                          <div className={cx('left')}></div>
                        </span>
                      )}
                      {transport > 0 && (
                        <span className={cx('deduction__value')}>
                          - {formatPrice.format(transport)}
                          <div className={cx('left')}></div>
                        </span>
                      )}
                    </div>
                  </div>
                  {/* voucher */}

                  <div className={cx('value')}>
                    <span className={cx('name')}>Tổng thanh toán</span>
                    <span className={cx('price')}>{`${formatPrice.format(
                      payment.pay
                    )}đ`}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('button')}>
              <Button large onClick={handleOnBuy}>
                Đặt hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PaymentOrder;
