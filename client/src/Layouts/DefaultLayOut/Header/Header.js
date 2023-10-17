import { faBell } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowRightToBracket,
  faMagnifyingGlass,
  faPhone,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import Cart from '~/components/Cart/Cart';
import { nav as Nav } from '~/constants/navigateHead';
import styles from './header.module.scss';
import config from '~/config';
import { useEffect } from 'react';
import { getUserData } from '~/api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { addInfoDataUser } from '~/store/slice/infoDataUser';
import { userData } from '~/store/slice/selector';
const cx = classNames.bind(styles);

function Header() {
  const user = useSelector(userData);
  const dispatch = useDispatch();
  const [nav, setNav] = useState(0);
  const navigate = useNavigate();
  const handleNav = (id, to) => {
    setNav(id);
    navigate(to);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserData();
        if (res) {
          dispatch(
            addInfoDataUser({
              ...res,
              status: true,
            })
          );
        }
      } catch (error) {
        console.log('No users');
      }
    };
    fetchUser();
  }, []);

  return (
    <div className={cx('header')}>
      <div className={cx('inner')}>
        <div className={cx('container')}>
          <img className={cx('logo')} src={images.logo} alt="" />
          <div className={cx('contact')}>
            <span className={cx('contact__item')}>
              <FontAwesomeIcon className={cx('icon')} icon={faPhone} />
              Call Center
            </span>
            <span className={cx('contact__item')}>
              <FontAwesomeIcon className={cx('icon')} icon={faTruck} />
              Shipping & Returns
            </span>
          </div>
        </div>
        <div className={cx('navbar')}>
          <div className={cx('navbar__inner')}>
            <div className={cx('category')}>
              {Nav.map((item, i) => {
                return (
                  <span
                    key={i}
                    onClick={() => handleNav(item.order, item.to)}
                    className={cx('navigate', nav === i ? 'active' : '')}
                  >
                    {item.text}
                  </span>
                );
              })}
            </div>
            <div className={cx('search')}>
              <input
                className={cx('input')}
                placeholder="Search what you need"
              />
              <FontAwesomeIcon
                className={cx('icon')}
                icon={faMagnifyingGlass}
              />
            </div>
            <div className={cx('menu')}>
              <FontAwesomeIcon className={cx('item')} icon={faBell} />
              {user.status ? (
                <img src={user.avatar} className={cx('avatar')} alt="" />
              ) : (
                <Button
                  outline
                  onClick={() => navigate(config.routes.LogIn)}
                  icon={<FontAwesomeIcon icon={faArrowRightToBracket} />}
                >
                  Log in
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
