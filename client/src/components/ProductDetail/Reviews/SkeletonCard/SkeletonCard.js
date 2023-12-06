import classNames from 'classnames/bind';
import styles from '../Review.module.scss';

// Skeleton
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const cx = classNames.bind(styles);

function SkeletonCard() {
  return Array(2)
    .fill(0)
    .map((item, i) => {
      return (
        <div className={cx('user')} key={i}>
          <Skeleton className={cx('avatar')} circle width={50} height={50} />
          <div className={cx('item')}>
            <div className={cx('rating')}>
              <h6 className={cx('name')}>
                <Skeleton width={70} />
              </h6>
              <div className={cx('star')}>
                <Skeleton width={70} />
              </div>
            </div>
            <div className={cx('time')}>
              <Skeleton width={30} />
            </div>
            <div className={cx('comment')}>
              <div className={cx('comment__list__img')}>
                <Skeleton width={70} height={70} className={cx('img')} />
                <Skeleton width={70} height={70} className={cx('img')} />
              </div>
            </div>
            <p className={cx('text')}>
              <Skeleton width={250} count={2} />
            </p>
          </div>
        </div>
      );
    });
}

export default SkeletonCard;
