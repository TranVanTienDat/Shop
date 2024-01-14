import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import propType from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button/Button';
import { errMes, success } from '~/constants/ToastMessage/ToastMessage';
import { userData } from '~/store/slice/selector';

import { days, months, years } from '~/constants/date';

import userApi from '~/api/modules/auth.api';
import { setIsLoadingButton } from '~/store/slice/loadingSlice';
import styles from './Components.module.scss';
const cx = classNames.bind(styles);

export const Wrapper = ({ title, children }) => {
  return (
    <div
      style={{
        margin: '16px 10px',
      }}
    >
      <h3
        style={{
          fontSize: '1.8rem',
          marginBottom: '30px',
          color: '#3c71ff',
        }}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          style={{ fontSize: '1.3rem', marginRight: '5px' }}
        />
        {title}
      </h3>
      {children}
    </div>
  );
};
Wrapper.propType = {
  children: propType.node,
  title: propType.string,
};

export const DetailInfo = () => {
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
    dispatch(setIsLoadingButton({ isLoadingButton: false }));
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
    <Wrapper title="Hồ sơ của tôi">
      <div className={cx('inner__1')}>
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
    </Wrapper>
  );
};

export const ChangePassword = () => {
  const dispatch = useDispatch();
  const [isSetInfoBtn, setIsSetInfoBtn] = useState(false);
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    enterPassword: '',
  });

  const handlePasswordChange = (field, value) => {
    setPassword((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsSetInfoBtn(true);
  };

  const funcCheckPassword = (arg) => {
    const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
    return pattern.test(arg);
  };

  const handleUpdatePassword = async () => {
    const { currentPassword, newPassword, enterPassword } = password;
    if (currentPassword === newPassword) {
      errMes('The same password');
    } else if (
      newPassword === enterPassword &&
      newPassword.length > 0 &&
      funcCheckPassword(newPassword)
    ) {
      try {
        dispatch(setIsLoadingButton({ isLoadingButton: true }));

        const { res } = await userApi.updatePassword({
          currentPassword,
          newPassword,
        });
        dispatch(setIsLoadingButton({ isLoadingButton: false }));

        if (res) {
          success('Update success');
          setPassword({
            currentPassword: '',
            newPassword: '',
            enterPassword: '',
          });
          setIsSetInfoBtn(false);
        }
      } catch (error) {
        errMes(error.response.data.message);
      }
    } else {
      errMes('Please enter correctly');
    }
  };

  return (
    <Wrapper title="Thay đổi mật khẩu">
      {/* detail */}
      <div className={cx('inner__2')}>
        <form>
          <div className={cx('detail')}>
            <label className={cx('title')}>Mật khẩu hiện tại</label>
            <input
              className={cx('input')}
              value={password?.currentPassword}
              onChange={(e) =>
                handlePasswordChange('currentPassword', e.target.value)
              }
            />
          </div>

          <div className={cx('detail')}>
            <label className={cx('title')}>Mật khẩu mới</label>
            <input
              className={cx('input')}
              type="password"
              value={password?.newPassword}
              onChange={(e) =>
                handlePasswordChange('newPassword', e.target.value)
              }
            />
          </div>

          <div className={cx('detail')}>
            <label className={cx('title')}>Nhập lại mật khẩu</label>
            <input
              className={cx('input')}
              type="password"
              value={password?.enterPassword}
              onChange={(e) =>
                handlePasswordChange('enterPassword', e.target.value)
              }
            />
          </div>
        </form>
        {/* detail */}
        <h3 className={cx('note')}>
          Lưu ý: Mật khẩu mới có độ dài ít nhất 6 ký tự, với số, chữ cái và ký
          tự đặc biệt
        </h3>
        <span className={cx('button')}>
          <Button
            large={isSetInfoBtn}
            disabled={!isSetInfoBtn}
            onClick={handleUpdatePassword}
          >
            Cập nhật
          </Button>
        </span>
      </div>
    </Wrapper>
  );
};
