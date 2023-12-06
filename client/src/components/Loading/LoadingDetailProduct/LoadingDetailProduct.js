import classNames from 'classnames/bind';
import styles from './LoadingDetailProduct.module.scss';
import { useSelector } from 'react-redux';
import { setGlobalLoading } from '~/store/slice/selector';
import { useEffect } from 'react';
import { useState } from 'react';
import images from '~/assets/images';
const cx = classNames.bind(styles);

function LoadingDetailProduct() {
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
      <div className={cx('wrapper')}>
        <div className={cx('animate')}>
          <span className={cx('loading')}></span>
        </div>
        <div className={cx('inner')}>
          <img className={cx('logo')} src={images.logo} alt="" />
        </div>
      </div>
    )
  );
}

export default LoadingDetailProduct;
