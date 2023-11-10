import { faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import orderApi from '~/api/modules/order.api';
import Button from '~/components/Button/Button';
import { errMes, success } from '~/constants/ToastMessage/ToastMessage';
import { sidebarCheckout } from '~/constants/sidebarCheckout';
import { Animate } from '~/features/Auth/Sign/SignIn';
import { formatPrice } from '~/hook/func';
import {
  setIsLoadingButton,
  setIsLoadingRating,
} from '~/store/slice/loadingSlice';
import styles from './Checkout.module.scss';
const cx = classNames.bind(styles);
function Checkout() {
  const dispatch = useDispatch();
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
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
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
                      <div
                        className={cx('product__flex', 'product__flex--line')}
                      >
                        <div className={cx('box')}>
                          <span className={cx('address')}>{data.address}</span>
                        </div>

                        {data.status.typeStatus !== 5 && (
                          <Button
                            large
                            onClick={
                              data.status.typeStatus === 1
                                ? () => orderCancel(data._id, 5)
                                : data.status.typeStatus === 4
                                ? () =>
                                    dispatch(
                                      setIsLoadingRating({
                                        isLoadingRating: true,
                                        productID: data.store.productID,
                                      })
                                    )
                                : null
                            }
                          >
                            {data.status.typeStatus === 1 && 'Hủy Đơn Hàng'}
                            {data.status.typeStatus === 2 &&
                              'Liên hệ vận chuyển'}
                            {data.status.typeStatus === 3 &&
                              'Liên hệ vận chuyển'}
                            {data.status.typeStatus === 4 &&
                              'Đánh giá sản phẩm'}
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
                          <Button large>Mua lại</Button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <Animate />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
