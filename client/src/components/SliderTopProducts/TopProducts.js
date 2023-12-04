import 'react-lazy-load-image-component/src/effects/blur.css';
import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// style swiper
import 'swiper/scss';
import 'swiper/scss/navigation';

import classNames from 'classnames/bind';
import styles from './TopProducts.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import productApi from '~/api/modules/product.api';
import { formatPrice } from '~/hook/func';

const cx = classNames.bind(styles);

function TopProducts() {
  const navigate = useNavigate();
  const getWindowSize = () => {
    const width = window.innerWidth;
    if (width >= 767) return 4;
    else if (767 > width && width > 576) return 3;
    else return 2;
  };
  const [isWidth, setIsWidth] = useState(getWindowSize());

  useEffect(() => {
    const handleSetWidth = () => setIsWidth(getWindowSize());
    window.addEventListener('resize', handleSetWidth);
    return () => window.removeEventListener('resize', handleSetWidth);
  }, []);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchTopProducts = async () => {
      const { res } = await productApi.getTopProducts();
      if (res) {
        setProducts(res);
      }
    };
    fetchTopProducts();
  }, []);

  const handleNavigate = (name, _id) => {
    navigate(`/detail-product/${name}/${_id}`);
  };
  return (
    <section className={cx('category')}>
      <h1 className={cx('heading')}>Top sản phẩm</h1>
      <p className={cx('text')}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </p>
      <Swiper
        modules={[Autoplay, Navigation]}
        loop={true}
        loopFillGroupWithBlank={true}
        slidesPerView={isWidth}
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
                  style={{
                    backgroundImage: `url(${data?.images[0]})`,
                    position: 'relative',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                  }}
                >
                  <div
                    className={cx('info')}
                    onClick={() => handleNavigate(data?.name, data?._id)}
                  >
                    <h2 className={cx('name')}>{data?.name}</h2>
                    <h4 className={cx('brand')}>{data?.categories[0]}</h4>
                    <div className={cx('price')}>
                      <span className={cx('item')}>
                        {formatPrice.format(
                          data?.selectProduct?.listProduct[0]?.newPrice
                        )}
                      </span>
                      <span className={cx('item', 'item--color')}>
                        {formatPrice.format(
                          data.selectProduct.listProduct[0]?.oldPrice
                        )}
                      </span>
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
