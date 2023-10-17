import classNames from 'classnames/bind';
import propType from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { updatePassword } from '~/api/authApi';
import Button from '~/components/Button/Button';
import { err, success } from '~/constants/ToastMessage/ToastMessage';
import { userData } from '~/store/slice/selector';
import Default from '../Default/Default';
import styles from './ChangePassword.module.scss';
const cx = classNames.bind(styles);

function ChangePassword({ isBlock = false }) {
  const { id } = useSelector(userData);
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
  };

  const funcCheckPassword = (arg) => {
    const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
    return pattern.test(arg);
  };

  const handleUpdatePassword = async () => {
    if (id === 'firebase') {
      err('No password update');
      return;
    }
    const { currentPassword, newPassword, enterPassword } = password;
    if (currentPassword === newPassword) {
      err('The same password');
    } else if (
      newPassword === enterPassword &&
      newPassword.length > 0 &&
      funcCheckPassword(newPassword)
    ) {
      try {
        await updatePassword(id, {
          currentPassword,
          newPassword,
        });
        success('Update success');
        setPassword({
          currentPassword: '',
          newPassword: '',
          enterPassword: '',
        });
      } catch (error) {
        err(error.response.data.message);
      }
    } else {
      err('Please enter correctly');
    }
  };

  return (
    <div style={isBlock ? { display: 'block' } : { display: 'none' }}>
      <Default title="Change password">
        {/* detail */}
        <form>
          <div className={cx('detail')}>
            <label className={cx('title')}>Current password</label>
            <input
              className={cx('input')}
              value={password?.currentPassword}
              onChange={(e) =>
                handlePasswordChange('currentPassword', e.target.value)
              }
            />
          </div>

          <div className={cx('detail')}>
            <label className={cx('title')}>New password</label>
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
            <label className={cx('title')}>Enter the password</label>
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
          Note: The new password has a length of at least 6 characters, with
          numbers, letters and special characters
        </h3>
        <span className={cx('button')}>
          <Button success onClick={handleUpdatePassword}>
            update
          </Button>
        </span>
      </Default>
    </div>
  );
}

ChangePassword.propType = {
  isBlock: propType.bool,
};
export default ChangePassword;
