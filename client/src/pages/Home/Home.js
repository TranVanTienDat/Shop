import classNames from 'classnames/bind';
import AboutUs from '~/components/AboutUs/AboutUs';
import CategoriesShop from '~/components/CategoriesShop/CategoriesShop';
import TopProducts from '~/components/SliderTopProducts/TopProducts';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('wrapper')}>
      <CategoriesShop title="Our Premium Collection" />
      <TopProducts />
      <AboutUs />
    </div>
  );
}

export default Home;
