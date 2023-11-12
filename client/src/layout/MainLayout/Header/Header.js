import { faBell } from '@fortawesome/free-regular-svg-icons';

import {
  faArrowDownShortWide,
  faArrowRightToBracket,
  faBars,
  faCircleInfo,
  faIdBadge,
  faMagnifyingGlass,
  faPhone,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'tippy.js/dist/svg-arrow.css';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import config from '~/config';
import { nav as Nav } from '~/constants/navigate';
import { setStatus } from '~/store/slice/infoDataUser';
import {
  setToggleMenuFilter,
  setToggleSidebar,
} from '~/store/slice/loadingSlice';
import { setKeyword } from '~/store/slice/searchParamsSlice';
import { state, userData } from '~/store/slice/selector';
import { setAppState } from '~/store/slice/stateAppSlice';
import MenuFilterResponsive from './MenuFilterResponsive/MenuFilterResponsive';
import styles from './header.module.scss';
const cx = classNames.bind(styles);

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, avatar } = useSelector(userData);
  const { appState } = useSelector(state);
  const [user, setUser] = useState({
    status: false,
    avatar: '',
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    setUser({ status, avatar });
  }, [status, avatar]);

  const handleLogOut = () => {
    localStorage.removeItem('access');
    dispatch(setStatus({ status: false }));
  };

  const handleNavigate = () => {
    navigate('/my-account');
    dispatch(setAppState('account'));
  };

  const handleOnChange = (value) => {
    if (!value.startsWith(' ')) {
      setSearch(value);
    }
  };
  const handleSearch = () => {
    if (search) {
      let location = window.location.pathname;
      if (location !== '/order-online') {
        navigate('/order-online');
      }
      dispatch(setKeyword({ keyword: search }));
    }
  };

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
                  <Button
                    key={i}
                    className={cx(
                      appState.includes(item.state) ? 'active' : ''
                    )}
                    text
                    to={item.to}
                  >
                    {item.text}
                  </Button>
                );
              })}
            </div>
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => {
                dispatch(setToggleSidebar({ isToggleSidebar: true }));
              }}
              className={cx('menu__responsive')}
            />

            <div className={cx('search')}>
              <input
                value={search}
                onChange={(e) => handleOnChange(e.target.value)}
                className={cx('input')}
                placeholder="Tìm kiếm sản phẩm"
              />
              <div className={cx('filter')}>
                <FontAwesomeIcon
                  className={cx('icon')}
                  icon={faMagnifyingGlass}
                  onClick={handleSearch}
                />
                <FontAwesomeIcon
                  style={
                    appState.includes('shop')
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                  className={cx('icon')}
                  icon={faArrowDownShortWide}
                  onClick={() =>
                    dispatch(setToggleMenuFilter({ isToggleMenuFilter: true }))
                  }
                />
              </div>
            </div>
            <div className={cx('menu')}>
              <FontAwesomeIcon className={cx('menu__item')} icon={faBell} />
              {user.status ? (
                <Tippy
                  arrow={true}
                  interactive
                  render={(attrs) => (
                    <ul className={cx('user__menu')} {...attrs} tabIndex="-1">
                      <li className={cx('item')} onClick={handleNavigate}>
                        <FontAwesomeIcon
                          className={cx('icon')}
                          icon={faIdBadge}
                        />
                        My account
                      </li>
                      <li className={cx('item')}>
                        <FontAwesomeIcon
                          className={cx('icon')}
                          icon={faCircleInfo}
                        />
                        Feedback and help
                      </li>
                      <li className={cx('item')} onClick={handleLogOut}>
                        <FontAwesomeIcon
                          className={cx('icon')}
                          icon={faArrowRightToBracket}
                        />
                        Log out
                      </li>
                    </ul>
                  )}
                >
                  <img
                    className={cx('user__avatar')}
                    src={user.avatar}
                    alt="user"
                  />
                </Tippy>
              ) : (
                <Button
                  outline
                  onClick={() => navigate(config.routes.signIn)}
                  icon={<FontAwesomeIcon icon={faArrowRightToBracket} />}
                >
                  Log in
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <MenuFilterResponsive />
    </div>
  );
}

export default Header;
