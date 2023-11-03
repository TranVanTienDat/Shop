import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import images from '~/assets/images';
import {
  dataVoucherDiscount,
  dataVoucherTransport,
} from '~/constants/dataVoucher';
import { addVoucher } from '~/store/slice/voucherSlice';
import Button from '../Button/Button';
import styles from './InputVoucher.module.scss';
const cx = classNames.bind(styles);

function InputVoucher({ id }) {
  const dispatch = useDispatch();
  const [isToggleMenuVoucher, setIsToggleMenuVoucher] = useState(false);
  const handleToggleMenuVoucher = () => {
    setIsToggleMenuVoucher(!isToggleMenuVoucher);
  };

  const [voucher, setVoucher] = useState({
    discount: 0,
    transport: 0,
    status: false,
    productID: id,
  });

  const handleGetVoucher = (field, value) => {
    setVoucher((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddVoucher = () => {
    setVoucher((prev) => ({ ...prev, status: true }));
    dispatch(
      addVoucher({
        ...voucher,
        status: true,
      })
    );
  };

  return (
    <div className={cx('coupon')}>
      <div className={cx('coupon__input')}>
        <span className={cx('name')}>Có phiếu giảm giá?</span>
        <div className={cx('voucher')}>
          <input className={cx('input')} placeholder="Nhập mã vouchers" />
          <FontAwesomeIcon
            icon={faAngleDown}
            className={cx('icon')}
            onClick={handleToggleMenuVoucher}
          />
          <div
            className={cx(
              'list',
              isToggleMenuVoucher ? 'list--open' : 'list--close'
            )}
          >
            <div className={cx('element')}>
              <span className={cx('title')}>Mã giảm giá</span>
              <ul className={cx('list__voucher')}>
                {dataVoucherDiscount.map((item, i) => {
                  return (
                    <li key={i} className={cx('item')}>
                      <div className={cx('item__img', 'item--bg_dis')}>
                        <img
                          className={cx('img')}
                          src={images.discount}
                          alt=""
                        />
                        <span className={cx('name')}>{item.name}</span>
                      </div>

                      <div className={cx('des')}>
                        <h4 className={cx('title')}>{item.title}</h4>
                        <h6 className={cx('condition')}>{item.condition}</h6>
                        <span className={cx('expiry')}>{item.HSD}</span>
                      </div>
                      <input
                        className={cx('check')}
                        type="radio"
                        value={item.price}
                        name="voucherDiscount"
                        onChange={(e) =>
                          handleGetVoucher('discount', e.target.value)
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={cx('element')}>
              <span className={cx('title')}>Mã Vận Chuyển</span>
              <ul className={cx('list__voucher')}>
                {dataVoucherTransport.map((data, i) => {
                  return (
                    <li key={i} className={cx('item')}>
                      <div className={cx('item__img', 'item--bg_trans')}>
                        <img
                          className={cx('img')}
                          src={images.transport}
                          alt=""
                        />
                        <span className={cx('name')}>{data.name}</span>
                      </div>

                      <div className={cx('des')}>
                        <h4 className={cx('title')}>{data.title}</h4>
                        <h6 className={cx('condition')}>{data.condition}</h6>
                        <span className={cx('expiry')}>{data.HSD}</span>
                      </div>
                      <input
                        className={cx('check')}
                        type="radio"
                        value={data.price}
                        name="voucherTransport"
                        onChange={(e) =>
                          handleGetVoucher('transport', e.target.value)
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <Button large onClick={handleAddVoucher}>
          thêm
        </Button>
      </div>
    </div>
  );
}

export default InputVoucher;
