import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import styles
import classNames from 'classnames/bind';
import styles from './TopProducts.module.scss';
// style swiper
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'swiper/scss';
import 'swiper/scss/navigation';
import { getTopProducts } from '~/api/productsApi';

const cx = classNames.bind(styles);

function TopProducts() {
  const navigate = useNavigate();
  // const getWindowSize = () => {
  //   const width = window.innerWidth;
  //   if (width > 1024) return 7;
  //   else if (width >= 912) return 6;
  //   else if (width >= 576) return 4;
  //   else return 3;
  // };
  // const [isWidth, setIsWidth] = useState(getWindowSize());

  // useEffect(() => {
  //   const handleSetWidth = () => setIsWidth(getWindowSize());
  //   window.addEventListener('resize', handleSetWidth);
  //   return () => window.removeEventListener('resize', handleSetWidth);
  // }, []);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await getTopProducts();
        if (response) {
          setProducts(response.data);
        }
      } catch (error) {
        console.log(1);
      }
    };
    fetchTopProducts();
  }, []);

  const handleNavigate = (name, _id) =>
    navigate(`/detail-product/${name}/${_id}`);
  return (
    <section className={cx('category')}>
      <h1 className={cx('title')}>Top Items</h1>
      <p className={cx('heading')}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </p>
      <Swiper
        modules={[Autoplay, Navigation]}
        loop={true}
        loopFillGroupWithBlank={true}
        slidesPerView={4}
        navigation={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {products.length > 0 &&
          products.map((data, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  className={cx('card')}
                  onClick={() => handleNavigate(data?.name, data?._id)}
                >
                  <div className={cx('background')}>
                    <img className={cx('img')} src={data?.images[0]} alt="" />
                    <div className={cx('info')}>
                      <h2 className={cx('name')}>{data?.name}</h2>
                      <h4 className={cx('brand')}>{data?.categories[0]}</h4>
                      <div className={cx('price')}>
                        <span className={cx('item')}>
                          {data?.selectProduct?.listProduct[0]?.newPrice}
                        </span>
                        <span className={cx('item', 'item--color')}>
                          {data.selectProduct.listProduct[0]?.oldPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
}

export default TopProducts;
