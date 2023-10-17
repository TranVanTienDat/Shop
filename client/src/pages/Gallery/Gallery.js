import classNames from 'classnames/bind';
import CustomerReviews from '~/components/AboutUs/CustomerReviews/CustomerReviews';
import InputJoin from '~/components/AboutUs/InputJoin/InputJoin';
import Banner from '~/components/Banner/Banner';
import CategoriesShop from '~/components/CategoriesShop/CategoriesShop';
import styles from './Gallery.module.scss';
const cx = classNames.bind(styles);

function Gallery() {
  return (
    <div className={cx('wrapper')}>
      <Banner />
      <CategoriesShop title="Our Gallery" />
      <CustomerReviews />
      <InputJoin />
    </div>
  );
}

export default Gallery;
