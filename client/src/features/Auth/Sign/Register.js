import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import userApi from '~/api/modules/auth.api';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import { success, warning } from '~/constants/ToastMessage/ToastMessage';
import styles from './Sign.module.scss';
const cx = classNames.bind(styles);
function Register() {
  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).+$/,
        'Password needs digits, letters and characters'
      )
      .required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const onSubmit = async (data) => {
    try {
      const user = {
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: images.avatar,
      };
      const { res } = await userApi.signUp(user);
      if (res) {
        success('success, please login');
      }
    } catch (error) {
      warning(error?.response?.data?.message);
    }
  };
  return (
    <>
      <div className={cx('inner')}>
        <div className={cx('login')}>
          <div className={cx('input')}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className={cx('title')}>Register</h1>
              <label htmlFor="username">User name</label>
              <input name="username" {...register('name')} />
              <div className={cx('error')}>{errors.username?.message}</div>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" {...register('email')} />
              <div className={cx('error')}>{errors.email?.message}</div>

              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                {...register('password')}
              />
              <div className={cx('error')}>{errors.password?.message}</div>

              <Button large type="submit">
                Register
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
