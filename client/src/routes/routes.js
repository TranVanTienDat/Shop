//Page
import ProductDetail from '~/components/ProductDetail/ProductDetail';
import config from '~/config';
import { SignIn, SignUp } from '~/features/Auth/Auth';
import Popper from '~/features/Auth/Popper/Popper';
import ResetPassword from '~/features/Auth/resetPassword/ResetPassword';
import AccountWrapper from '~/pages/Account/AccountWrapper';
import {
  ChangePassword,
  DetailInfo,
} from '~/pages/Account/components/Components';
import Notification from '~/pages/Account/components/Notification/Notification';
import Contact from '~/pages/Contact/Contact';
import Gallery from '~/pages/Gallery/Gallery';
import Home from '~/pages/Home/Home';
import MyCartWrapper from '~/pages/MyCart/MyCartWrapper';
import { Checkout, ShoppingCart } from '~/pages/MyCart/components/Components';
import OrderOnline from '~/pages/OrderOnline/OrderOnline';
import PaymentOrder from '~/pages/PaymentOrder/PaymentOrder';
// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home, index: true, state: 'home' },

  {
    path: config.routes.orderOnline,
    component: OrderOnline,
    state: 'shop',
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
    childrenLayout: MyCartWrapper,
    state: 'shoppingcart',
  },
  {
    path: config.routes.checkout,
    component: Checkout,
    childrenLayout: MyCartWrapper,
    state: 'checkout',
  },
  {
    path: config.routes.profile,
    component: DetailInfo,
    childrenLayout: AccountWrapper,
    state: 'account',
    layout: null,
  },
  {
    path: config.routes.changePassword,
    component: ChangePassword,
    childrenLayout: AccountWrapper,
    state: 'changePassword',
    layout: null,
  },
  {
    path: config.routes.setting,
    component: Notification,
    childrenLayout: AccountWrapper,
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
