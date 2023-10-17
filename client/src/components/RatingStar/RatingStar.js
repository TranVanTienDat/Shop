import classNames from 'classnames/bind';
import styles from './RatingStar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as Rating } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
const cx = classNames.bind(styles);

const list = ['', '', '', '', ''];
function RatingStar({ value }) {
  const handle = (value, i) => {
    const result = Math.round((value - i) * 100);
    return result > 0 ? result : 0;
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('list')}>
          {list.map((item, i) => {
            return (
              <div
                key={i}
                className={cx('star')}
                onClick={() => handle(value, i)}
              >
                <div
                  className={cx('element')}
                  style={
                    value >= i + 1
                      ? {
                          width: '100%',
                        }
                      : { width: `${handle(value, i)}%` }
                  }
                >
                  <FontAwesomeIcon
                    className={cx('element__icon')}
                    icon={Rating}
                  />
                </div>
                <FontAwesomeIcon className={cx('star__icon')} icon={faStar} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RatingStar;
