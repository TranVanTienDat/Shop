import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import Button from '~/components/Button/Button';
import { setToggleMenuFilter } from '~/store/slice/loadingSlice';
import { setGlobalLoading } from '~/store/slice/selector';
import { NavigateSearchParams } from '~/utils/updateSearchParams';
import styles from './MenuFilterResponsive.module.scss';

const cx = classNames.bind(styles);
function TopSidebar() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { isToggleMenuFilter } = useSelector(setGlobalLoading);
  const [isToggle, setIsToggle] = useState(false);
  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 0,
    rating: 0,
  });
  useEffect(() => {
    setIsToggle(isToggleMenuFilter);
  }, [isToggleMenuFilter]);

  const handleFilter = (field, value) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    dispatch(setToggleMenuFilter({ isToggleMenuFilter: false }));
  };
  const handleSearch = () => {
    const navigateSearch = NavigateSearchParams(params, filter);
    navigate({
      pathname: '/search',
      search: `?${createSearchParams(navigateSearch)}`,
    });
    handleClose();
  };
  return (
    <div
      className={cx('wrapper', isToggle ? 'wrapper--open' : 'wrapper--close')}
    >
      <div className={cx('inner')}>
        <FontAwesomeIcon
          icon={faXmark}
          className={cx('icon--close')}
          onClick={handleClose}
        />
        <div className={cx('box')}>
          <h5 className={cx('heading')}>Sắp xếp</h5>
          <div className={cx('menu')}>
            <span className={cx('title')}>Giá thành</span>
            <span className={cx('title')}>Đánh giá</span>
            <span className={cx('title', 'sort--active')}>Bán chạy nhất</span>
          </div>
        </div>

        <div className={cx('box')}>
          <h5 className={cx('heading')}>Khoảng giá</h5>
          <div className={cx('menu')}>
            <input
              className={cx('input')}
              placeholder="100"
              value={filter.minPrice}
              onChange={(e) => handleFilter('minPrice', e.target.value)}
            />
            <span className={cx('text')}>đến</span>
            <input
              className={cx('input')}
              placeholder="200"
              value={filter.maxPrice}
              onChange={(e) => handleFilter('maxPrice', e.target.value)}
            />
          </div>
        </div>

        <div className={cx('box')}>
          <h5 className={cx('heading')}>Lượt đánh giá</h5>
          <div className={cx('menu')}>
            <select
              className={cx('select')}
              value={filter.rating}
              onChange={(e) => handleFilter('rating', e.target.value)}
            >
              <option value={0} className={cx('option')}>
                Lựa chọn
              </option>
              <option value={5} className={cx('option')}>
                đánh giá 5 sao
              </option>
              <option value={4} className={cx('option')}>
                đánh giá 4 sao
              </option>
              <option value={3} className={cx('option')}>
                đánh giá 3 sao
              </option>
              <option value={2} className={cx('option')}>
                đánh giá 2 sao
              </option>
              <option value={1} className={cx('option')}>
                đánh giá 1 sao
              </option>
            </select>
          </div>
        </div>
        <div className={cx('button')}>
          <Button outline onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TopSidebar;
