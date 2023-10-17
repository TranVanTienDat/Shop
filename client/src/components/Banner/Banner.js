// import style scss
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';

//import swiper
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';

import images from '~/assets/images';
import { dataBanner } from '~/constants/dataBanner';

const cx = classNames.bind(styles);
function Banner() {
  return (
    <div className={cx('wrapper')}>
      <section className={cx('slider')}>
        <Swiper
          slidesPerView={1}
          pagination={true}
          modules={[Pagination, Autoplay]}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {dataBanner.map((data, i) => {
            return (
              <SwiperSlide key={i}>
                <div
                  className={cx('banner')}
                  style={{
                    backgroundImage: `url(${data.image})`,
                  }}
                ></div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      <div className={cx('background__banner')}>
        <img className={cx('img')} src={images.banner1} alt="" />
        <img className={cx('img')} src={images.banner2} alt="" />
      </div>
    </div>
  );
}

export default Banner;
