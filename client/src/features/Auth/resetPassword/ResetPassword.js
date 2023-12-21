import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { errMes } from '~/constants/ToastMessage/ToastMessage';

import { useNavigate } from 'react-router-dom';
import userApi from '~/api/modules/auth.api';
import Button from '~/components/Button/Button';
import { success } from '~/constants/ToastMessage/ToastMessage';
import styles from './ResetPassword.module.scss';
import { useDispatch } from 'react-redux';
import { setIsLoadingButton } from '~/store/slice/loadingSlice';

const cx = classNames.bind(styles);
function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // form rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    dispatch(setIsLoadingButton({ isLoadingButton: true }));
    const { res, err } = await userApi.resetPassword({ email: data.email });
    dispatch(setIsLoadingButton({ isLoadingButton: false }));

    if (res) {
      success(res.message);
      navigate('/sign-in');
    }

    if (err) {
      errMes(err.response?.data.message);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <form className={cx('inner')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('heading')}>
          <h2 className={cx('title')}>Reset Password</h2>
          <span className={cx('icon-back')} onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
        </div>

        <div className={cx('body')}>
          <div className={cx('box')}>
            <input placeholder="Email" {...register('email')} />
            <div className={cx('err')}>{errors.email?.message}</div>
          </div>
          <Button type="submit" large>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
