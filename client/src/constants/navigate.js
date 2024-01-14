import config from '~/config';

import { faFile } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowRightFromBracket,
  faBasketShopping,
  faGears,
  faHome,
  faIdBadge,
  faListCheck,
  faStore,
  faUnlockKeyhole,
  faUserSlash,
} from '@fortawesome/free-solid-svg-icons';
export const nav = [
  {
    to: config.routes.home,
    icon: faHome,
    text: 'Home',
    state: 'home',
  },
  {
    to: `${config.routes.orderOnline}?numberPage=0&limit=20`,
    icon: faBasketShopping,
    text: 'Shop',
    state: 'shop',
  },
  {
    to: config.routes.gallery,
    icon: faStore,

    text: 'Gallery',
    state: 'gallery',
  },
  {
    to: config.routes.contact,
    icon: faIdBadge,
    text: 'Contact',
    state: 'contact',
  },
];
export const menuCart = [
  {
    title: '1. Giỏ hàng mua săm',
    to: '/shopping-cart',
    state: 'shoppingcart',
  },
  {
    title: '2. Kiểm tra đơn hàng',
    to: '/check-out',
    state: 'checkout',
  },
];

export const sideBar = [
  { title: 'Hồ sơ', icon: faFile, navigate: '/my-account', state: 'account' },
  {
    title: 'Cài đặt thông báo',
    icon: faGears,
    navigate: '/setting',
    state: 'setting',
  },
  {
    title: 'Đổi mật khẩu',
    icon: faUnlockKeyhole,
    navigate: '/change-password',
    state: 'changePassword',
  },
  {
    title: 'Đăng xuất',
    icon: faArrowRightFromBracket,
    navigate: '/',
    state: 'home',
  },
  {
    title: 'Xóa tài khoản',
    icon: faUserSlash,
    navigate: undefined,
    state: 'remoteAccount',
  },
  {
    title: 'Quản lí đơn hàng',
    icon: faListCheck,
    navigate: '/check-out',
    state: 'checkout',
  },
];
