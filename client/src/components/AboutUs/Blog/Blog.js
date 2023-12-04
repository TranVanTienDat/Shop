import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
// lazy images
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { blog } from '~/constants/blog';

const cx = classNames.bind(styles);

function Blog() {
  return (
    <div className={cx('wrapper')}>
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
          {blog.map((item, i) => {
            return (
              <div key={i} className={cx('post')}>
                <LazyLoadImage
                  src={item.img}
                  effect="blur"
                  alt=""
                  width="100%"
                  height="auto"
                  placeholderSrc={item.img}
                  threshold={0.5}
                />

                <div className={cx('body')}>
                  <h3 className={cx('title')}>{item.title}</h3>
                  <div className={cx('info')}>
                    <span className={cx('time')}>{item.time}</span>
                    <div></div>
                    <span className={cx('time')}>{item.style}</span>
                  </div>
                  <p className={cx('des')}>{item.desc}</p>

                  <div className={cx('see_more')}>Explore More...</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Blog;
