import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames/bind';
import styles from './ToastMessage.module.scss';
const cx = classNames.bind(styles);
export const warning = (info) =>
  toast.warning(info, {
    position: 'top-right',
    autoClose: undefined,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    className: cx('toast_message'),
  });

export const success = (info) =>
  toast.success(info, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    className: 'toast_message',
  });

export const err = (info) =>
  toast.error(info, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    className: 'toast_message',
  });

export const info = (info) =>
  toast.info(info, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    className: 'toast_message',
  });
