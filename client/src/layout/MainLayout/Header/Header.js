import { faBell } from '@fortawesome/free-regular-svg-icons';

import { faOpencart } from '@fortawesome/free-brands-svg-icons';
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
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
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
import { state, userData } from '~/store/slice/selector';
import { setAppState } from '~/store/slice/stateAppSlice';
import MenuFilterResponsive from '../../../features/shop/SideBar/MenuFilterResponsive/MenuFilterResponsive';
import styles from './header.module.scss';
const cx = classNames.bind(styles);

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { status, avatar } = useSelector(userData);
  const { appState } = useSelector(state);
  const [user, setUser] = useState({
    status: false,
    avatar: '',
  });
  const [search, setSearch] = useState();

  useEffect(() => {
    setUser({ status, avatar });
  }, [status, avatar]);

  useEffect(() => {
    if (params.get('keyword')) {
      setSearch(params.get('keyword'));
    }
  }, [params]);
  const handleLogOut = () => {
    localStorage.removeItem('access');
    dispatch(setStatus({ status: false }));
  };

  const handleNavigate = (_id) => {
    if (_id === 0) {
      navigate('/my-account');
      dispatch(setAppState('account'));
    } else if (_id === 1) {
      navigate('/shopping-cart');
      dispatch(setAppState('shoppingcart'));
    }
  };

  const handleOnChange = (value) => {
    if (!value.startsWith(' ')) {
      setSearch(value);
    }
  };

  const handleSearch = () => {
    if (search) {
      navigate({
        pathname: '/search',
        search: `?${createSearchParams({
          keyword: search,
          numberPage: 0,
          limit: 20,
        })}`,
      });
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
                    appState.includes('search')
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
                      <li
                        className={cx('item')}
                        onClick={() => handleNavigate(0)}
                      >
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
                      <li
                        className={cx('item')}
                        onClick={() => handleNavigate(1)}
                      >
                        <FontAwesomeIcon
                          className={cx('icon')}
                          icon={faOpencart}
                        />
                        Giỏ hàng
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
