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

const cx = classNames.bind(styles);
function ResetPassword() {
  const navigate = useNavigate();
  // form rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit } = useForm(formOptions);

  const onSubmit = async (data) => {
    try {
      const res = await userApi.forgotPassword({ email: data.email });
      success(res.data.message);
      navigate('/log-in');
    } catch (error) {
      errMes(error.response.data.message);
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
          <input placeholder="Email" {...register('email')} />
          <Button type="submit" danger>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
