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
// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },

  {
    path: config.routes.orderOnline,
    component: OrderOnline,
  },
  {
    path: config.routes.profileUser,
    component: Account,
  },
  {
    path: config.routes.gallery,
    component: Gallery,
  },
  {
    path: config.routes.contact,
    component: Contact,
  },
  {
    path: config.routes.detailProduct,
    component: ProductDetail,
  },
  {
    path: config.routes.myCart,
    component: MyCart,
  },
  {
    path: config.routes.paymentOrder,
    component: PaymentOrder,
    layout: null,
  },
  { path: config.routes.resetPassword, component: ResetPassword, layout: null },
  { path: config.routes.LogIn, component: Popper, layout: null },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
