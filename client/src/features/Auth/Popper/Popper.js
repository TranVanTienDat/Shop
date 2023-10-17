import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Register from '../Sign/Register';
import LogIn from '../Sign/LogIn';

import styles from './Popper.module.scss';

const cx = classNames.bind(styles);
function Popper() {
  const [toggle, setToggle] = useState({ isToggle: true, title: 'Register' });
  const handleToggle = () => {
    toggle.isToggle
      ? setToggle({ isToggle: false, title: 'Log in' })
      : setToggle({ isToggle: true, title: 'Register' });
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('background')}>
          <h2 className={cx('heading')}>Hello, Friend!</h2>
          <p className={cx('text')}>
            Enter your personal details and start journey with us
          </p>
          <button className={cx('button-logIn')} onClick={handleToggle}>
            {toggle.title}
          </button>
        </div>
        <div className={cx('logIn')}>
          <div className={cx('toggle-login')} onClick={handleToggle}>
            <FontAwesomeIcon icon={faRightToBracket} />
          </div>
          {toggle.isToggle ? <LogIn /> : <Register />}
        </div>
      </div>
    </div>
  );
}

export default Popper;
