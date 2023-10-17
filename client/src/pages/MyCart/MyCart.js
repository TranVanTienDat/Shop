import classNames from 'classnames/bind';
import { useState } from 'react';
import { menuCart } from '~/constants/menuComp';
import styles from './MyCart.module.scss';

const cx = classNames.bind(styles);

function MyCart() {
  const [nav, setNav] = useState({
    index: 0,
    Comp: menuCart[0].Comp,
  });
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('navigate')}>
          {menuCart.map((title, i) => {
            return (
              <span
                key={i}
                onClick={() => setNav({ index: i, Comp: title.Comp })}
                className={cx('title', nav.index === i && 'active')}
              >
                {title.title}
              </span>
            );
          })}
        </div>
        {<nav.Comp />}
      </div>
    </div>
  );
}

export default MyCart;
