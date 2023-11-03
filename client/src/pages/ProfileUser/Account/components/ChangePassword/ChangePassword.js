import classNames from 'classnames/bind';
import { useState } from 'react';
import userApi from '~/api/modules/auth.api';
import Button from '~/components/Button/Button';
import { errMes, success } from '~/constants/ToastMessage/ToastMessage';
import Default from '../Default/Default';
import styles from './ChangePassword.module.scss';
import { useDispatch } from 'react-redux';
import { setIsLoadingButton } from '~/store/slice/loadingSlice';
const cx = classNames.bind(styles);

function ChangePassword() {
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
    <Default title="Thay đổi mật khẩu">
      {/* detail */}
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
        Lưu ý: Mật khẩu mới có độ dài ít nhất 6 ký tự, với số, chữ cái và ký tự
        đặc biệt
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
    </Default>
  );
}

export default ChangePassword;
