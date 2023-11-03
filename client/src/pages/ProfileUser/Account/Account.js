import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import { useState } from 'react';
import {
  Menu,
  MenuItem,
  Sidebar,
  menuClasses,
  sidebarClasses,
} from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import { sideBar } from '~/constants/navigate';
// import { UserAuth } from '~/firebase/context/AuthContext';
import { state, userData } from '~/store/slice/selector';
import styles from './Account.module.scss';
const cx = classNames.bind(styles);

function Account({ children }) {
  // const { logOut } = UserAuth();
  const { appState } = useSelector(state);
  const navigate = useNavigate();
  const { name, avatar } = useSelector(userData);
  const [collapsed, setCollapsed] = useState(true);
  const handleNavigate = (i, link) => {
    navigate(link);
    if (i === 3) {
      localStorage.removeItem('access');
      window.location.reload();
    }
  };
  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('heading')}>MY ACCOUNT</h3>
      <div className={cx('inner')}>
        <div className={cx('account')}>
          <div className={cx('profile')}>
            <div className={cx('info')}>
              <div className={cx('sidebar')}>
                <Sidebar
                  rootStyles={{
                    [`.${sidebarClasses.container}`]: {
                      backgroundColor: '#547AFF',
                      padding: '10px',
                    },
                  }}
                  collapsedWidth="65px"
                  collapsed={collapsed}
                >
                  <div className={cx('menu')}>
                    {!collapsed && (
                      <img src={images.logo} className={cx('logo')} alt="" />
                    )}
                    <FontAwesomeIcon
                      icon={faRightLeft}
                      className={cx('icon')}
                      onClick={() => setCollapsed(!collapsed)}
                    />
                  </div>
                  <Menu
                    rootStyles={{
                      [`.${menuClasses.button}`]: {
                        color: '#fff',
                        paddingLeft: '5px',
                        paddingRight: '5px',
                        margin: '5px 0',
                      },

                      [`.${menuClasses.button}:hover`]: {
                        backgroundColor: '#fff',
                        color: '#547AFF',
                      },
                    }}
                  >
                    {sideBar.map((item, i) => {
                      return (
                        <MenuItem
                          key={i}
                          style={
                            appState.includes(item.state)
                              ? {
                                  backgroundColor: '#fff',
                                  color: '#547AFF',
                                }
                              : null
                          }
                          icon={<FontAwesomeIcon icon={item.icon} />}
                          onClick={() => handleNavigate(i, item.navigate)}
                        >
                          {item.title}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </Sidebar>
              </div>
              <div className={cx('content')}>{children}</div>
            </div>
          </div>
          <div className={cx('image')}>
            <img className={cx('img')} src={avatar} alt="" />
            <h4 className={cx('fullName')}>{name}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
Account.propTypes = {
  children: propTypes.node,
};
export default Account;
