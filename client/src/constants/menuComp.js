import {
  faUser,
  faBell,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import { faKey, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Checkout from '~/pages/MyCart/components/Checkout/Checkout';
import ShoppingCart from '~/pages/MyCart/components/ShoppingCart/ShoppingCart';
import PaymentOrder from '~/pages/PaymentOrder/PaymentOrder';

import ChangePassword from '~/pages/ProfileUser/Account/components/ChangePassword/ChangePassword';
import DetailInfo from '~/pages/ProfileUser/Account/components/DetailInfo/DetailInfo';
import Notification from '~/pages/ProfileUser/Account/components/Notification/Notification';

export const sideBar = [
  { title: 'Account detail', icon: faUser },
  { title: 'Change password', icon: faKey },
  { title: 'Notification', icon: faBell },
  { title: 'Log out', icon: faRightFromBracket },
  { title: 'Delete user', icon: faTrashCan },
];

export const content = [
  { title: DetailInfo },
  { title: ChangePassword },
  { title: Notification },
];

export const menuCart = [
  { title: '1. Giỏ hàng mua săm', index: 0, Comp: ShoppingCart },
  { title: '2. Kiểm tra các đơn hàng', index: 1, Comp: Checkout },
];
