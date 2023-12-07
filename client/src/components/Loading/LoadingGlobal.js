import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import images from '~/assets/images';
import { setGlobalLoading } from '~/store/slice/selector';
import styles from './LoadingGlobal.module.scss';
const cx = classNames.bind(styles);

export const LoadingButton = () => {
  const { isLoadingButton } = useSelector(setGlobalLoading);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isLoadingButton) {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  }, [isLoadingButton]);
  return (
    loading && (
      <div className={cx('wrapper__1')}>
        <div className={cx('animate')}>
          <span className={cx('loading')}></span>
        </div>
      </div>
    )
  );
};

export const LoadingDetailProduct = () => {
  const { isLoading } = useSelector(setGlobalLoading);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [isLoading]);
  return (
    loading && (
      <div className={cx('wrapper__2')}>
        <div className={cx('animate')}>
          <span className={cx('loading')}></span>
        </div>
        <div className={cx('inner')}>
          <img className={cx('logo')} src={images.logo} alt="" />
        </div>
      </div>
    )
  );
};

export const LoadingAnimate = () => {
  return (
    <div className={cx('wrapper__3')}>
      {Array(3)
        .fill(0)
        .map((item, i) => (
          <span key={i} className={cx('pointer')}></span>
        ))}
    </div>
  );
};
