import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import images from '~/assets/images';

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
          <div className={cx('post')}>
            <img
              className={cx('img')}
              src={images.blog1}
              alt=""
              loading="lazy"
            />

            <div className={cx('body')}>
              <h3 className={cx('title')}>Best Summer Outfit Style</h3>
              <div className={cx('info')}>
                <span className={cx('time')}>14 Feb</span>
                <div></div>
                <span className={cx('time')}>Livina Style</span>
              </div>
              <p className={cx('des')}>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley. Lorem
                Ipsum has been the industry's standard dummy text ever since the
                1500s.
              </p>

              <div className={cx('see_more')}>Explore More...</div>
            </div>
          </div>

          <div className={cx('post')}>
            <img
              className={cx('img')}
              src={images.blog2}
              alt=""
              loading="lazy"
            />

            <div className={cx('body')}>
              <h3 className={cx('title')}>Best Summer Outfit Style</h3>
              <div className={cx('info')}>
                <span className={cx('time')}>14 Feb</span>
                <div></div>
                <span className={cx('time')}>Livina Style</span>
              </div>
              <p className={cx('des')}>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley. Lorem
                Ipsum has been the industry's standard dummy text ever since the
                1500s.
              </p>

              <div className={cx('see_more')}>Explore More...</div>
            </div>
          </div>

          <div className={cx('post')}>
            <img
              className={cx('img')}
              src={images.blog3}
              alt=""
              loading="lazy"
            />

            <div className={cx('body')}>
              <h3 className={cx('title')}>Best Summer Outfit Style</h3>
              <div className={cx('info')}>
                <span className={cx('time')}>14 Feb</span>
                <div></div>
                <span className={cx('time')}>Livina Style</span>
              </div>
              <p className={cx('des')}>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley. Lorem
                Ipsum has been the industry's standard dummy text ever since the
                1500s.
              </p>

              <div className={cx('see_more')}>Explore More...</div>
            </div>
          </div>

          <div className={cx('post')}>
            <img
              className={cx('img')}
              src={images.blog4}
              alt=""
              loading="lazy"
            />

            <div className={cx('body')}>
              <h3 className={cx('title')}>Best Summer Outfit Style</h3>
              <div className={cx('info')}>
                <span className={cx('time')}>14 Feb</span>
                <div></div>
                <span className={cx('time')}>Livina Style</span>
              </div>
              <p className={cx('des')}>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley. Lorem
                Ipsum has been the industry's standard dummy text ever since the
                1500s.
              </p>

              <div className={cx('see_more')}>Explore More...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
