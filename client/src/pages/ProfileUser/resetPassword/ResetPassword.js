import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { err } from '~/constants/ToastMessage/ToastMessage';
import { useForm } from 'react-hook-form';
import { forgotPassword } from '~/api/authApi';

import styles from './ResetPassword.module.scss';
import Button from '~/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { success } from '~/constants/ToastMessage/ToastMessage';

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
      const res = await forgotPassword({ email: data.email });
      success(res.data.message);
      navigate('/log-in');
    } catch (error) {
      err(error.response.data.message);
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
