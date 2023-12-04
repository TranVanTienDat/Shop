import classNames from 'classnames/bind';
import gsap from 'gsap';

import { useEffect, useRef } from 'react';
import { brand } from '~/constants/dateBrand';
import styles from './AboutUs.module.scss';
import Blog from './Blog/Blog';
import CustomerReviews from './CustomerReviews/CustomerReviews';
import InputJoin from './InputJoin/InputJoin';
import Story from './Story/Story';
const cx = classNames.bind(styles);

function AboutUs() {
  let containerRef = useRef(null);
  let brand1Ref = useRef(null);
  let brand2Ref = useRef(null);
  let brand3Ref = useRef(null);
  let brand4Ref = useRef(null);
  let brand5Ref = useRef(null);
  let brand6Ref = useRef(null);
  const brands = [
    brand1Ref,
    brand2Ref,
    brand3Ref,
    brand4Ref,
    brand5Ref,
    brand6Ref,
  ];
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef,
        start: '120% bottom',
      },
    });
    tl.from(brands[0], { y: 20, opacity: 0, duration: 0.8 }, '-=0.3')
      .from(brands[1], { y: 20, opacity: 0, duration: 0.8 }, '-=0.3')
      .from(brands[2], { y: 20, opacity: 0, duration: 0.8 }, '-=0.3')
      .from(brands[3], { y: 20, opacity: 0, duration: 0.8 }, '-=0.3')
      .from(brands[4], { y: 20, opacity: 0, duration: 0.8 }, '-=0.3')
      .from(brands[5], { y: 20, opacity: 0, duration: 0.8 }, '-=0.3');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        {/* story us */}
        <Story />
        {/* Good Seller! */}
        <CustomerReviews />
        {/* achievement us */}
        <div className={cx('achievement')}>
          <h1 className={cx('title')}>Thành tích của chúng tôi</h1>
          <div ref={(el) => (containerRef = el)} className={cx('brand')}>
            {brand.map((item, i) => {
              return (
                <img
                  key={i}
                  className={cx('brand__img')}
                  src={item.brand}
                  alt=""
                  ref={(el) => (brands[i] = el)}
                  loading="lazy"
                />
              );
            })}
          </div>
        </div>

        {/* blog  us*/}
        <Blog />
        {/* join us */}
        <InputJoin />
      </div>
    </div>
  );
}

export default AboutUs;
