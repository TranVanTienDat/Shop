import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '~/api/authApi';
import { success, warning } from '~/constants/ToastMessage/ToastMessage';
import { content, sideBar } from '~/constants/menuComp';
import { UserAuth } from '~/firebase/context/AuthContext';
import { handleLogOut } from '~/hook/func';
import styles from './Account.module.scss';
import { userData } from '~/store/slice/selector';
const cx = classNames.bind(styles);
const item = ['', '', ''];
function Account() {
  const { logOut } = UserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, address, numberPhone, gender, id, image } =
    useSelector(userData);

  const [state, setState] = useState({
    navigation: 0,
    tag: 0,
    progress: -1,
  });

  useEffect(() => {
    const { progress } = state;
    const getProgress = () => {
      let updatedProgress = progress;
      if (gender !== '') {
        updatedProgress += 1;
      }
      if (name !== '' && email !== '') {
        updatedProgress += 1;
      }
      if (address !== '' && numberPhone !== '') {
        updatedProgress += 1;
      }
      setState((prevState) => ({ ...prevState, progress: updatedProgress }));
    };
    getProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, address, numberPhone, gender]);

  const handleNavigate = async (i) => {
    const { navigation } = state;
    let updatedNavigation = navigation;
    if (i < 3) {
      updatedNavigation = i;
    }
    setState((prevState) => ({
      ...prevState,
      navigation: updatedNavigation,
      tag: i,
    }));

    switch (i) {
      case 3:
        handleLogOut(id, logOut, dispatch, navigate);
        break;

      case 4:
        const message = 'you may want to delete';
        const check = window.confirm(message);
        if (check) {
          try {
            await deleteUser(id);
            success('Delete success');
            navigate('/');
            window.location.reload();
          } catch (error) {
            warning(error.response.data.message);
            console.log(error);
          }
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>Account setting</h2>
      <div className={cx('inner')}>
        <div className={cx('account')}>
          <div className={cx('profile')}>
            <div className={cx('info')}>
              <div className={cx('sideBar')}>
                {/* progress */}
                <div className={cx('progress')}>
                  {item.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className={cx(
                          'item',
                          state.progress >= i ? 'color' : ''
                        )}
                      ></div>
                    );
                  })}
                </div>
                {/* progress */}
                <div className={cx('navigate')}>
                  {sideBar.map((item, i) => {
                    return (
                      <span
                        key={i}
                        className={cx(
                          'item',
                          state.navigation === i ? 'background' : ''
                        )}
                        onClick={() => handleNavigate(i)}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className={cx('icon')}
                        />
                        <h4 className={cx('title')}>{item.title}</h4>
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className={cx('content')}>
                {/*render component*/}
                {content.map((item, i) => {
                  const Tag = item.title;
                  return (
                    <Tag key={i} isBlock={state.tag === i ? true : false} />
                  );
                })}
                {/*render component*/}
              </div>
            </div>
          </div>
          <div className={cx('image')}>
            <img className={cx('img')} src={image} alt="" />
            <span className={cx('fullName')}>{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
