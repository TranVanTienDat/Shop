import classNames from 'classnames/bind';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button/Button';
import { errMes, success } from '~/constants/ToastMessage/ToastMessage';
import { userData } from '~/store/slice/selector';
import Default from '../Default/Default';

import { days, months, years } from '~/constants/date';

import userApi from '~/api/modules/auth.api';
import { setIsLoadingButton } from '~/store/slice/loadingSlice';
import styles from './DetailInfo.module.scss';
const cx = classNames.bind(styles);

function DetailInfo() {
  const dispatch = useDispatch();
  const { dateBirth, name, email, address, phoneNumber, gender } =
    useSelector(userData);
  const [info, setInfo] = useState(null);
  const [isSetInfoBtn, setIsSetInfoBtn] = useState(false);

  useEffect(() => {
    setInfo({
      name,
      email,
      address,
      phoneNumber,
      dateBirth,
      gender,
    });
  }, [name, email, address, phoneNumber, gender, dateBirth]);

  // Handle onchange
  const handleInfoChange = useCallback((field, value) => {
    setInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsSetInfoBtn(true);
  }, []);

  const handleUpdate = async () => {
    const { dateBirth } = info;
    dispatch(setIsLoadingButton({ isLoadingButton: true }));
    const { res, err } = await userApi.updateUser({
      ...info,
      dateBirth: `${dateBirth.day}/${dateBirth.month}/${dateBirth.year}`,
    });
    dispatch(setIsLoadingButton({ isLoadingButton: true }));
    if (res) {
      dispatch(setInfo({ ...info }));
      setIsSetInfoBtn(false);
      success('Update success');
    }
    if (err) {
      errMes(err.message);
    }
  };

  return (
    <Default title="Hồ sơ của tôi">
      <div className={cx('inner')}>
        <div className={cx('gender')}>
          <label className={cx('title')}>Giới tính</label>
          <form>
            <div className={cx('check')}>
              <input
                type="radio"
                id="gender1"
                value="male"
                onChange={(e) => handleInfoChange('gender', e.target.value)}
                checked={info?.gender === 'male'}
              />
              <label htmlFor="gender1">Nam</label>
            </div>
            <div className={cx('check')}>
              <input
                type="radio"
                id="gender2"
                value="female"
                onChange={(e) => handleInfoChange('gender', e.target.value)}
                checked={info?.gender === 'female'}
              />
              <label htmlFor="gender2">Nữ</label>
            </div>
            <div className={cx('check')}>
              <input
                type="radio"
                id="gender3"
                value="other"
                onChange={(e) => handleInfoChange('gender', e.target.value)}
                checked={info?.gender === 'other'}
              />
              <label htmlFor="gender3">Khác</label>
            </div>
          </form>
          {/* gender */}
        </div>

        {/*  */}
        <div className={cx('detail')}>
          <label className={cx('title')}>Họ tên</label>
          <input
            className={cx('input')}
            value={info?.name || ''}
            onChange={(e) => handleInfoChange('name', e.target.value)}
          />
        </div>
        <div className={cx('detail')}>
          <label className={cx('title')}>Email</label>
          <input
            className={cx('input')}
            value={info?.email || ''}
            onChange={(e) => handleInfoChange('email', e.target.value)}
          />
        </div>
        <div className={cx('detail')}>
          <label className={cx('title')}>Ngày sinh</label>
          <div className={cx('flex')}>
            <select
              value={info?.dateBirth.day}
              onChange={(e) =>
                handleInfoChange('dateBirth', {
                  ...info?.dateBirth,
                  day: e.target.value,
                })
              }
            >
              {days.map((item, i) => (
                <option key={i} className={cx('item')} value={item.value}>
                  {item.title}
                </option>
              ))}
            </select>

            <select
              value={info?.dateBirth.month}
              onChange={(e) =>
                handleInfoChange('dateBirth', {
                  ...info?.dateBirth,
                  month: e.target.value,
                })
              }
            >
              {months.map((item, i) => (
                <option key={i} className={cx('item')} value={item.value}>
                  {item.title}
                </option>
              ))}
            </select>

            <select
              value={info?.dateBirth.year}
              onChange={(e) =>
                handleInfoChange('dateBirth', {
                  ...info?.dateBirth,
                  year: e.target.value,
                })
              }
            >
              {years.map((item, i) => (
                <option key={i} className={cx('item')} value={item.value}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={cx('detail')}>
          <label className={cx('title')}>Số điện thoại</label>
          <input
            className={cx('input')}
            type="tel"
            value={info?.phoneNumber || ''}
            onChange={(e) => handleInfoChange('phoneNumber', e.target.value)}
          />
        </div>
        <span>
          <Button
            large={isSetInfoBtn}
            disabled={!isSetInfoBtn}
            onClick={handleUpdate}
          >
            Cập nhật
          </Button>
        </span>
      </div>
    </Default>
  );
}

export default DetailInfo;
