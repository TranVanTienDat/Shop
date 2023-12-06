import classNames from 'classnames/bind';
import styles from './CustomerReviews.module.scss';
import { dataSeller } from '~/constants/dataSeller';

// Lazy loading image
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
const cx = classNames.bind(styles);
function CustomerReviews() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <h2 className={cx('heading')}>Good Seller!</h2>
        <section className={cx('seller')}>
          <Swiper
            modules={[Autoplay, Navigation]}
            loop={true}
            loopFillGroupWithBlank={true}
            slidesPerView={1}
            navigation={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
          >
            {dataSeller.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className={cx('seller__inner')}>
                    <div className={cx('inner__img')}>
                      <LazyLoadImage
                        src={item.img}
                        effect="blur"
                        alt=""
                        width="100%"
                        height="auto"
                        threshold={1}
                        placeholderSrc={item.img}
                        style={{ borderRadius: '8px' }}
                      />
                    </div>

                    <div className={cx('description')}>
                      <p className={cx('text')}>
                        I am very happy with the services provided, it is very
                        helpful, starting from the insight that the company gave
                        from the start that I did not understand what it was so
                        I got knowledge and made my website look better
                      </p>
                      <div className={cx('name')}>Anna Saraspova</div>
                      <div className={cx('title')}>Your Beloved Buyer</div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
      </div>
    </div>
  );
}

export default CustomerReviews;
