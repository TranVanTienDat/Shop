import classNames from 'classnames/bind';
import styles from './RatingStar.module.scss';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as Rating } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { handleStar } from '~/utils/Star';
import { setRating } from '~/store/slice/ratingSlice';
import { useDispatch } from 'react-redux';
const cx = classNames.bind(styles);

function RatingStar({ value = false, onClick = false, sizeStar = false }) {
  const dispatch = useDispatch();
  const [star, setStar] = useState([]);
  const [onClickStar, setOnClickStar] = useState(5);
  useEffect(() => {
    if (value) {
      const rs = handleStar(value);
      setStar(rs);
    }
    if (onClick) {
      const rs = handleStar(onClickStar);
      setStar(rs);
    }
  }, [value, onClick, onClickStar]);

  const handleRating = (i) => {
    setOnClickStar(i);
    dispatch(setRating({ rating: i }));
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('list')}>
          {star.map((item, i) => {
            return (
              <div
                key={i}
                className={cx('star')}
                onClick={() => onClick && handleRating(i + 1)}
              >
                <div className={cx('element')} style={{ width: `${item}%` }}>
                  <FontAwesomeIcon
                    className={cx(sizeStar ? 'element--size' : 'element__icon')}
                    icon={Rating}
                  />
                </div>
                <FontAwesomeIcon
                  className={cx(sizeStar ? 'star--size' : 'star__icon')}
                  icon={faStar}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Rating.propTypes = {
  value: propTypes.number,
  onClick: propTypes.func,
  sizeStar: propTypes.bool,
};

export default RatingStar;
