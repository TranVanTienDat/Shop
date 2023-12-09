import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { menuCart } from '~/constants/navigate';
import { state } from '~/store/slice/selector';
import styles from './MyCartWrapper.module.scss';

const cx = classNames.bind(styles);

function MyCartWrapper({ children }) {
  const navigate = useNavigate();
  const { appState } = useSelector(state);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('navigate')}>
        {menuCart.map((item, i) => {
          return (
            <span
              key={i}
              onClick={() => navigate(item.to)}
              className={cx('title', appState.includes(item.state) && 'active')}
            >
              {item.title}
            </span>
          );
        })}
      </div>
      {children}
    </div>
  );
}
MyCartWrapper.propTypes = {
  children: propTypes.node,
};

export default MyCartWrapper;
