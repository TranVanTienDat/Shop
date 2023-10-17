import classNames from 'classnames/bind';
import styles from './OrderOnline.module.scss';
import Shop from '~/features/shop/Shop';
import Banner from '~/components/Banner/Banner';
import InputJoin from '~/components/AboutUs/InputJoin/InputJoin';
const cx = classNames.bind(styles);
function OrderOnline() {
  return (
    <div className={cx('wrapper')}>
      <Banner />
      <Shop />
      <InputJoin />
    </div>
  );
}

export default OrderOnline;
