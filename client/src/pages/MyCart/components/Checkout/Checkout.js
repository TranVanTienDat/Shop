import { faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { cancelOrder, getOrderProducts } from '~/api/cartApi';
import Button from '~/components/Button/Button';
import { sidebarCheckout } from '~/constants/sidebarCheckout';
import { Animate } from '~/features/Auth/Sign/LogIn';
import { formatPrice } from '~/hook/func';
import styles from './Checkout.module.scss';
import { err, success } from '~/constants/ToastMessage/ToastMessage';
const cx = classNames.bind(styles);
const buttonContent = [
  { status: 1, title: 'Hủy hàng' },
  { status: 4, title: 'Đánh giá' },
  { status: 2, title: 'liên hệ vận chuyển' },
  { status: 3, title: 'liên hệ vận chuyển' },
];
function Checkout() {
  const [listOrderProduct, setListOrderProduct] = useState([]);
  const [typeStatus, setTypeStatus] = useState(0);
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    const getOrder = async () => {
      setIsLoading(true);
      const { res, error } = await getOrderProducts(typeStatus);
      if (res) {
        console.log(res.data);
        setListOrderProduct(res.data);
      }
      if (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getOrder();
  }, [typeStatus]);

  const orderCancel = async (_id, typeStatus) => {
    const body = { _id, typeStatus };
    const { res, error } = await cancelOrder(body);
    if (res) {
      success('hủy hàng thành công');
    }

    if (error) {
      err(error.message);
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
                listOrderProduct?.map((data, i) => {
                  return (
                    <div key={i} className={cx('product')}>
                      <div className={cx('product__flex')}>
                        <div className={cx('flex__quantity')}>
                          {data.store.length > 0 &&
                            data.store.map((item, i) => {
                              return (
                                <div key={i} className={cx('flex__info')}>
                                  <img
                                    src={item.productImage}
                                    className={cx('img')}
                                    alt=""
                                  />
                                  <div className={cx('data')}>
                                    <h5 className={cx('name')}>
                                      {item.productName}
                                    </h5>
                                    <span className={cx('type')}>
                                      {`Phân loại hàng: ${
                                        item.productType !== item.productValue
                                          ? `${item.productType}, ${item.productValue}`
                                          : item.productType
                                      }`}
                                    </span>
                                    <span
                                      className={cx('quantity')}
                                    >{`x${item.productQuantity}`}</span>
                                  </div>
                                </div>
                              );
                            })}
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
                          <span className={cx('time')}>
                            {`Đơn hàng sẽ được chuẩn bị và chuyển đi trước ${data.transferTime}`}
                          </span>
                          <span className={cx('time')}>
                            {`Dự kiến ngày nhận hàng ${data.receivingTime}`}
                          </span>
                        </div>

                        {data.status.typeStatus !== 5 && (
                          <Button
                            large
                            onClick={
                              data.status.typeStatus === 1
                                ? () => orderCancel(data._id, 5)
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
