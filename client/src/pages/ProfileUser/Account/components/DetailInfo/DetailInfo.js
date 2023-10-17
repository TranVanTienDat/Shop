import classNames from 'classnames/bind';
import propType from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '~/api/authApi';

import Button from '~/components/Button/Button';
import { err, success } from '~/constants/ToastMessage/ToastMessage';
import { addInfoFirebase } from '~/store/slice/infoDataUser';
import { userData } from '~/store/slice/selector';
import Default from '../Default/Default';

import styles from './DetailInfo.module.scss';
const cx = classNames.bind(styles);

function DetailInfo({ isBlock = false }) {
  const { name, email, address, numberPhone, gender, id } =
    useSelector(userData);

  const dispatch = useDispatch();
  const [info, setInfo] = useState(null);
  useEffect(() => {
    setInfo({
      name,
      email,
      address,
      numberPhone,
      gender,
      id,
    });
  }, [name, email, address, numberPhone, gender, id]);

  // Handle gender
  const handleInfoChange = useCallback((field, value) => {
    setInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleUpdate = async () => {
    const { id, name, email, gender, address, numberPhone } = info;
    if (id === 'firebase') {
      try {
        dispatch(addInfoFirebase({ address, numberPhone, gender }));
        success('Update success');
      } catch (error) {
        err('Update failure');
        console.log(error);
      }
    } else {
      try {
        await updateUser(id, {
          name,
          email,
          gender,
          address,
          phoneNumber: numberPhone,
        });
        success('Update success');
      } catch (error) {
        err(error.response.data.message);
      }
    }
  };

  return (
    <div style={isBlock ? { display: 'block' } : { display: 'none' }}>
      <Default title="My account">
        <div className={cx('inner')}>
          <div className={cx('gender')}>
            <label className={cx('title')}>Gender</label>
            <form>
              <div className={cx('check')}>
                <input
                  type="radio"
                  id="gender1"
                  value="male"
                  onChange={(e) => handleInfoChange('gender', e.target.value)}
                  checked={info?.gender === 'male'}
                />
                <label htmlFor="gender1">Male</label>
              </div>
              <div className={cx('check')}>
                <input
                  type="radio"
                  id="gender2"
                  value="female"
                  onChange={(e) => handleInfoChange('gender', e.target.value)}
                  checked={info?.gender === 'female'}
                />
                <label htmlFor="gender2">Female</label>
              </div>
              <div className={cx('check')}>
                <input
                  type="radio"
                  id="gender3"
                  value="other"
                  onChange={(e) => handleInfoChange('gender', e.target.value)}
                  checked={info?.gender === 'other'}
                />
                <label htmlFor="gender3">Other</label>
              </div>
            </form>
            {/* gender */}
          </div>

          {/*  */}
          <div className={cx('detail')}>
            <label className={cx('title')}>Full name</label>
            <input
              className={cx('input')}
              value={info?.name || ''}
              onChange={(e) => handleInfoChange('name', e.target.value)}
              disabled={!!(id === 'firebase')}
            />
          </div>
          <div className={cx('detail')}>
            <label className={cx('title')}>Email</label>
            <input
              className={cx('input')}
              value={info?.email || ''}
              onChange={(e) => handleInfoChange('email', e.target.value)}
              disabled={!!(id === 'firebase')}
            />
          </div>
          <div className={cx('detail')}>
            <label className={cx('title')}>Address</label>
            <input
              className={cx('input')}
              value={info?.address || ''}
              onChange={(e) => handleInfoChange('address', e.target.value)}
            />
          </div>
          <div className={cx('detail')}>
            <label className={cx('title')}>Phone number</label>
            <input
              className={cx('input')}
              value={info?.numberPhone || ''}
              onChange={(e) => handleInfoChange('numberPhone', e.target.value)}
            />
          </div>
          {/*  */}
          <span>
            <Button success onClick={handleUpdate}>
              Update
            </Button>
          </span>
        </div>
      </Default>
    </div>
  );
}

Default.propType = {
  isBlock: propType.bool,
};

export default DetailInfo;
