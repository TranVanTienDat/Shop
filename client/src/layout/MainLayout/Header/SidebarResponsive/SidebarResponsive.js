import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Sidebar, sidebarClasses } from 'react-pro-sidebar';
import { useDispatch, useSelector } from 'react-redux';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import { nav } from '~/constants/navigate';
import { setToggleSidebar } from '~/store/slice/loadingSlice';
import { setGlobalLoading, state } from '~/store/slice/selector';
import styles from './SidebarResponsive.module.scss';
const cx = classNames.bind(styles);

function SidebarResponsive() {
  const dispatch = useDispatch();
  const { appState } = useSelector(state);
  const { isToggleSidebar } = useSelector(setGlobalLoading);

  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    setCollapsed(isToggleSidebar);
  }, [isToggleSidebar]);
  return (
    <div className={cx('wrapper')}>
      {collapsed ? (
        <div
          className={cx('overlay')}
          onClick={() => dispatch(setToggleSidebar({ isToggleSidebar: false }))}
        ></div>
      ) : null}
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: '#5f5f5f',
            padding: '20px 0',
            position: 'fixed',
            top: '0',
            left: collapsed ? '0' : '-300px',
            transition: 'all .3s linear',
            zIndex: '200',
          },
        }}
        width="220px"
        collapsed={collapsed}
      >
        <div className={cx('logo')}>
          <img src={images.logoWhite} className={cx('img')} alt="" />
        </div>
        <div className={cx('menu')}>
          <span className={cx('title')}>Menu</span>
          <div className={cx('list')}>
            {nav.map((item, i) => {
              return (
                <Button
                  btnSidebar
                  key={i}
                  to={item.to}
                  icon={<FontAwesomeIcon icon={item.icon} />}
                  className={cx(appState.includes(item.state) ? 'active' : '')}
                  onClick={() =>
                    dispatch(setToggleSidebar({ isToggleSidebar: false }))
                  }
                >
                  {item.text}
                </Button>
              );
            })}
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

export default SidebarResponsive;
