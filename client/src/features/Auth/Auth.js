import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import userApi from '~/api/modules/auth.api';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import config from '~/config';
import { errMes, success } from '~/constants/ToastMessage/ToastMessage';
import { setInfo } from '~/store/slice/infoDataUser';
import { setIsLoadingButton } from '~/store/slice/loadingSlice';
import { parseDate } from '~/utils/timeConversion';
import styles from './Auth.module.scss';
const cx = classNames.bind(styles);
export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
};

export const SignUp = () => {
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
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: images.avatar,
    };
    const { res, err } = await userApi.signUp(user);
    if (res) {
      success('Đăng kí thành công, đăng nhập bạn ơi');
    }
    if (err) {
      errMes(err.response.data.message);
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('login')}>
        <div className={cx('login__email')}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cx('box')}>
              <label htmlFor="username">Full name</label>
              <input
                className={cx('input')}
                htmlFor="username"
                name="username"
                {...register('name')}
              />
            </div>

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
              <Button large>Register</Button>
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
};
