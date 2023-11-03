import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import userApi from '~/api/modules/auth.api';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import { warning } from '~/constants/ToastMessage/ToastMessage';
import { UserAuth } from '~/firebase/context/AuthContext';
import { setInfo } from '~/store/slice/infoDataUser';
import { parseDate } from '~/utils/timeConversion';
import styles from './Sign.module.scss';
const cx = classNames.bind(styles);
function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { googleSignIn, user } = UserAuth();
  const [animate, setAnimate] = useState(false);

  // form rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  // Log in with Mongo
  const onSubmit = async (data) => {
    try {
      const user = {
        email: data.email,
        password: data.password,
      };
      const { res } = await userApi.signIn(user);
      if (res) {
        JSON.stringify(localStorage.setItem('access', res.token));
        const date = parseDate(res.user.dateBirth);
        dispatch(
          setInfo({
            ...res.user,
            status: true,
            dateBirth: date,
          })
        );
        navigate('/');
      }
    } catch (error) {
      warning(error.response.data.message);
    }
  };

  const handleSignGoogle = async () => {
    try {
      setAnimate(!animate);
      await googleSignIn();
      setAnimate(!animate);
    } catch {
      console.error('loi');
    }
  };
  useEffect(() => {
    if (user !== null) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <div className={cx('inner')}>
        <div className={cx('login')}>
          <div className={cx('input')}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className={cx('title')}>Log in</h1>
              <label htmlFor="email">Email</label>
              <input name="email" {...register('email')} autoComplete="email" />
              <div className={cx('error')}>{errors.email?.message}</div>

              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                {...register('password')}
              />
              <div className={cx('error')}>{errors.password?.message}</div>

              <div className={cx('link')}>
                <Link to="/reset-password">
                  <span>Forgot password</span>
                </Link>
              </div>

              <Button large type="submit">
                Log in
              </Button>

              <h4 className={cx('text')}>or continue with</h4>
              <div className={cx('logo')}>
                <div className={cx('brand')} onClick={handleSignGoogle}>
                  {animate ? (
                    <Animate />
                  ) : (
                    <>
                      <img className={cx('icon')} src={images.google} alt="" />
                      Sign in with Google
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;

export const Animate = () => {
  const circle = ['pointer', 'pointer', 'pointer'];
  return (
    <div className={cx('animate')}>
      {circle.map((item, i) => (
        <span key={i} className={cx(item)}></span>
      ))}
    </div>
  );
};
