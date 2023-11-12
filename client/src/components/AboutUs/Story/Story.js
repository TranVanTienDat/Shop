import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Story.module.scss';

const cx = classNames.bind(styles);

function Story() {
  let containerRef = useRef(null);
  let imageRef = useRef(null);
  let titleRef = useRef(null);
  let textRef = useRef(null);
  let buttonRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef,
        start: '110% bottom',
      },
    });

    tl.from(imageRef, { x: -20, opacity: 0, duration: 1 }, '-=0.1')
      .from(titleRef, { x: 20, opacity: 0, duration: 1 }, '-=0.3')
      .from(textRef, { y: 20, opacity: 0, duration: 1 }, '-=0.3')
      .from(buttonRef, { x: 20, opacity: 0, duration: 0.8 }, '-=0.3');
  }, []);

  return (
    <section className={cx('wrapper')} ref={(el) => (containerRef = el)}>
      <div className={cx('stories__img')}>
        <img
          ref={(el) => (imageRef = el)}
          className={cx('img')}
          src="https://down-vn.img.susercontent.com/file/00fbe083abf1192506a041f849f77391"
          alt=""
        />
      </div>
      <div className={cx('story')}>
        <h1 className={cx('title')} ref={(el) => (titleRef = el)}>
          Story about Our Brand
        </h1>
        <p className={cx('text')} ref={(el) => (textRef = el)}>
          Develop a website by finding a product identity that has value and
          branding to become a characteristic of a company. We will also
          facilitate the business marketing of these products with our SEO
          experts so that they become a ready-to-use website and help sell a
          product from the company Develop a website by finding a product
          identity that has value and branding to become a characteristic of a
          company. We will also facilitate the business marketing of these
          products with our SEO experts so that they become a ready-to-use
          website and help sell a product from the company
        </p>

        <div ref={(el) => (buttonRef = el)} className={cx('more')}>
          Read full story
        </div>
      </div>
    </section>
  );
}

export default Story;
