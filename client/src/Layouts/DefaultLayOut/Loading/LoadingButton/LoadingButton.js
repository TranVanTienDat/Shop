import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setGlobalLoading } from '~/store/slice/selector';
import styles from './LoadingButton.module.scss';
const cx = classNames.bind(styles);

function LoadingButton() {
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
      <div className={cx('wrapper')}>
        <div className={cx('animate')}>
          <span className={cx('loading')}></span>
        </div>
      </div>
    )
  );
}

export default LoadingButton;
