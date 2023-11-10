import classNames from 'classnames/bind';
import propTypes from 'prop-types';

import styles from './Popper.module.scss';

const cx = classNames.bind(styles);
function Popper({ children }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>{children}</div>
    </div>
  );
}

Popper.propTypes = {
  children: propTypes.node,
};
export default Popper;
