import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import userApi from '~/api/modules/auth.api';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import config from '~/config';
import { errMes } from '~/constants/ToastMessage/ToastMessage';
import { UserAuth } from '~/firebase/context/AuthContext';
import { setInfo } from '~/store/slice/infoDataUser';
import { setIsLoadingButton } from '~/store/slice/loadingSlice';
import { parseDate } from '~/utils/timeConversion';
import styles from './Sign.module.scss';
const cx = classNames.bind(styles);
function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { googleSignIn, user } = UserAuth();

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
    dispatch(setIsLoadingButton({ isLoadingButton: true }));
    const user = {
      email: data.email,
      password: data.password,
    };
    const { res, err } = await userApi.signIn(user);
    dispatch(setIsLoadingButton({ isLoadingButton: false }));
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
    if (err) {
      errMes(err?.response?.data?.message);
    }
  };

  // const handleSignGoogle = async () => {
  //   try {
  //     setAnimate(!animate);
  //     await googleSignIn();
  //     setAnimate(!animate);
  //   } catch {
  //     console.error('loi');
  //   }
  // };
  useEffect(() => {
    if (user !== null) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('heading')}>
        <h3 className={cx('title')}>Log in</h3>
        <div className={cx('register')}>
          <span className={cx('text')}>Don’t have an account?</span>
          <span
            className={cx('text', 'text--blue')}
            onClick={() => navigate(config.routes.signUp)}
          >
            Sign Up
          </span>
        </div>
      </div>

      <div className={cx('login')}>
        <div className={cx('login__email')}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cx('box')}>
              <label htmlFor="email">Email</label>
              <input
                className={cx('input')}
                name="email"
                {...register('email')}
                autoComplete="email"
              />
              <div className={cx('error')}>{errors.email?.message}</div>
            </div>

            <div className={cx('box')}>
              <label htmlFor="password">Password</label>
              <input
                className={cx('input')}
                name="password"
                type="password"
                autoComplete="current-password"
                {...register('password')}
              />
              <div className={cx('error')}>{errors.password?.message}</div>
            </div>
            <div className={cx('button')}>
              <Button large>Log in</Button>
            </div>
          </form>
        </div>

        <div className={cx('middle')}>
          <span className={cx('text')}>or</span>
          <div className={cx('height')}></div>
        </div>

        <div className={cx('login__other')}>
          <button className={cx('button', 'button--bg-light-blue')}>
            Continue with Google
            <img src={images.iconGoogle} alt="" className={cx('icon')} />
          </button>
          <button className={cx('button', 'button--bg-dark-blue')}>
            Continue with Facebook
            <img src={images.iconFacebook} alt="" className={cx('icon')} />
          </button>
          <button className={cx('button', 'button--bg-white')}>
            Continue with Apple
            <img src={images.iconApple} alt="" className={cx('icon')} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

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
