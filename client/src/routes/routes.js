//Page
import config from '~/config';
import Popper from '~/features/Auth/Popper/Popper';
import Contact from '~/pages/Contact/Contact';
import Gallery from '~/pages/Gallery/Gallery';
import Home from '~/pages/Home/Home';
import MyCart from '~/pages/MyCart/MyCart';
import OrderOnline from '~/pages/OrderOnline/OrderOnline';
import Account from '~/pages/ProfileUser/Account/Account';
import ResetPassword from '~/pages/ProfileUser/resetPassword/ResetPassword';
import ProductDetail from '~/components/ProductDetail/ProductDetail';
import PaymentOrder from '~/pages/PaymentOrder/PaymentOrder';
import ShoppingCart from '~/pages/MyCart/components/ShoppingCart/ShoppingCart';
import Checkout from '~/pages/MyCart/components/Checkout/Checkout';
import DetailInfo from '~/pages/ProfileUser/Account/components/DetailInfo/DetailInfo';
import ChangePassword from '~/pages/ProfileUser/Account/components/ChangePassword/ChangePassword';
import Notification from '~/pages/ProfileUser/Account/components/Notification/Notification';
import { SignIn, SignUp } from '~/features/Auth/Auth';
// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home, index: true, state: 'home' },

  {
    path: config.routes.orderOnline,
    component: OrderOnline,
    state: 'shop',
  },
  {
    path: config.routes.profileUser,
    component: Account,
    state: null,
  },
  {
    path: config.routes.gallery,
    component: Gallery,
    state: 'gallery',
  },
  {
    path: config.routes.contact,
    component: Contact,
    state: 'contact',
  },
  {
    path: config.routes.detailProduct,
    component: ProductDetail,
    state: null,
    layout: null,
  },

  {
    path: config.routes.shoppingCart,
    component: ShoppingCart,
    childrenLayout: MyCart,
    state: 'shoppingcart',
  },
  {
    path: config.routes.checkout,
    component: Checkout,
    childrenLayout: MyCart,
    state: 'checkout',
  },
  {
    path: config.routes.profile,
    component: DetailInfo,
    childrenLayout: Account,
    state: 'account',
  },
  {
    path: config.routes.changePassword,
    component: ChangePassword,
    childrenLayout: Account,
    state: 'changePassword',
  },
  {
    path: config.routes.setting,
    component: Notification,
    childrenLayout: Account,
    state: 'setting',
  },

  {
    path: config.routes.paymentOrder,
    component: PaymentOrder,
    layout: null,
  },
  { path: config.routes.resetPassword, component: ResetPassword, layout: null },
  {
    path: config.routes.signIn,
    component: SignIn,
    childrenLayout: Popper,
    layout: null,
  },
  {
    path: config.routes.signUp,
    component: SignUp,
    childrenLayout: Popper,
    layout: null,
  },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
