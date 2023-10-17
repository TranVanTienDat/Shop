import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import styles from './Modal.module.scss';
const cx = classNames.bind(styles);

function Modal({ children }) {
  return (
    <div className={cx('modal')}>
      <div className={cx('modal__overlay')}>
        <div className={cx('inner')}>
          <div className={cx('content')}>{children}</div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  Children: propTypes.node,
  title: propTypes.string,
};

export default Modal;
