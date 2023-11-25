import classNames from 'classnames/bind';
import gsap from 'gsap';
import React, { Suspense } from 'react';
import { useEffect, useRef } from 'react';
import { brand } from '~/constants/dateBrand';
import styles from './AboutUs.module.scss';
import CustomerReviews from './CustomerReviews/CustomerReviews';
import InputJoin from './InputJoin/InputJoin';
import Story from './Story/Story';
import images from '~/assets/images';
const cx = classNames.bind(styles);

const StoryComponent = React.lazy(() => import('./Story/Story'));
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
        start: '150% bottom',
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
        {/* <Story /> */}
        <Suspense fallback={<div>...</div>}>
          <section>
            <StoryComponent />
          </section>
        </Suspense>
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
                />
              );
            })}
          </div>
        </div>

        {/* blog  us*/}
        <div className={cx('blog')}>
          <div className={cx('blog__inner')}>
            <div className={cx('heading')}>
              <h1 className={cx('heading__title')}>
                Get Better Insights
                <br />
                from Our Articles
              </h1>
              <span className={cx('see_more')}>See more</span>
            </div>

            <div className={cx('blog__post')}>
              <div className={cx('post')}>
                <img className={cx('img')} src={images.blog1} alt="" />

                <div className={cx('body')}>
                  <h3 className={cx('title')}>Best Summer Outfit Style</h3>
                  <div className={cx('info')}>
                    <span className={cx('time')}>14 Feb</span>
                    <div></div>
                    <span className={cx('time')}>Livina Style</span>
                  </div>
                  <p className={cx('des')}>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley.
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s.
                  </p>

                  <div className={cx('see_more')}>Explore More...</div>
                </div>
              </div>

              <div className={cx('post')}>
                <img className={cx('img')} src={images.blog2} alt="" />

                <div className={cx('body')}>
                  <h3 className={cx('title')}>Best Summer Outfit Style</h3>
                  <div className={cx('info')}>
                    <span className={cx('time')}>14 Feb</span>
                    <div></div>
                    <span className={cx('time')}>Livina Style</span>
                  </div>
                  <p className={cx('des')}>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley.
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s.
                  </p>

                  <div className={cx('see_more')}>Explore More...</div>
                </div>
              </div>

              <div className={cx('post')}>
                <img className={cx('img')} src={images.blog3} alt="" />

                <div className={cx('body')}>
                  <h3 className={cx('title')}>Best Summer Outfit Style</h3>
                  <div className={cx('info')}>
                    <span className={cx('time')}>14 Feb</span>
                    <div></div>
                    <span className={cx('time')}>Livina Style</span>
                  </div>
                  <p className={cx('des')}>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley.
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s.
                  </p>

                  <div className={cx('see_more')}>Explore More...</div>
                </div>
              </div>

              <div className={cx('post')}>
                <img className={cx('img')} src={images.blog4} alt="" />

                <div className={cx('body')}>
                  <h3 className={cx('title')}>Best Summer Outfit Style</h3>
                  <div className={cx('info')}>
                    <span className={cx('time')}>14 Feb</span>
                    <div></div>
                    <span className={cx('time')}>Livina Style</span>
                  </div>
                  <p className={cx('des')}>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley.
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s.
                  </p>

                  <div className={cx('see_more')}>Explore More...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* join us */}
        <InputJoin />
      </div>
    </div>
  );
}

export default AboutUs;
