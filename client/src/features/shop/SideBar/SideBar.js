import {
  faChevronRight,
  faFilterCircleDollar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button/Button';
import { setSearch } from '~/store/slice/searchParamsSlice';
import { setGlobalLoading } from '~/store/slice/selector';
import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

function SideBar() {
  const dispatch = useDispatch();
  const { isToggleSidebarFilter } = useSelector(setGlobalLoading);
  const [filter, setFilter] = useState({
    keyword: '',
    minPrice: 0,
    maxPrice: 0,
    category: '',
  });

  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    setIsToggle(isToggleSidebarFilter);
  }, [isToggleSidebarFilter]);

  const handleFilter = (field, value) => {
    if (field === 'keyword') {
      if (!value.startsWith(' ')) {
        setFilter((prev) => ({ ...prev, [field]: value }));
      }
    } else {
      setFilter((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSearch = () => {
    dispatch(setSearch({ ...filter }));
  };

  return (
    <div
      className={cx('wrapper', isToggle ? 'wrapper--open' : 'wrapper--close')}
    >
      <input
        className={cx('search')}
        placeholder="Search products"
        value={filter.keyword}
        onChange={(e) => handleFilter('keyword', e.target.value)}
      />

      <div className={cx('price')}>
        <div className={cx('heading')}>
          <span className={cx('title')}>Price</span>
          <FontAwesomeIcon className={cx('icon')} icon={faFilterCircleDollar} />
        </div>
        <div className={cx('menu')}>
          <input
            className={cx('menu__input')}
            placeholder="200"
            value={filter.minPrice}
            onChange={(e) => handleFilter('minPrice', e.target.value)}
          />
          <span className={cx('menu__text')}>đến</span>
          <input
            className={cx('menu__input')}
            placeholder="200"
            value={filter.maxPrice}
            onChange={(e) => handleFilter('maxPrice', e.target.value)}
          />
        </div>
      </div>

      <Button large onClick={handleSearch}>
        Tìm kiếm
      </Button>

      <div className={cx('product__categories')}>
        <h1 className={cx('heading')}>Product Categories</h1>
        <div className={cx('categories')}>
          <div className={cx('item')}>
            <span className={cx('title')}>Coat and Jackets</span>
            <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
          </div>
          <div className={cx('item')}>
            <span className={cx('title')}>Dressses</span>
            <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
          </div>
          <div className={cx('item')}>
            <span className={cx('title')}>Playsuit</span>
            <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
          </div>
          <div className={cx('item')}>
            <span className={cx('title')}>Short</span>
            <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
          </div>
          <div className={cx('item')}>
            <span className={cx('title')}>Top</span>
            <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
          </div>
        </div>
      </div>

      <div className={cx('product__featured')}>
        <h1 className={cx('heading')}>Featured Product</h1>
        <div className={cx('list')}>
          <div className={cx('product')}>
            <img
              className={cx('img')}
              src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfalvvg3pjdj5e"
              alt=""
            />

            <div className={cx('description')}>
              <h4 className={cx('name')}>Tropical Playsuit</h4>
              <span className={cx('price')}>$100</span>
            </div>
          </div>
          <div className={cx('product')}>
            <img
              className={cx('img')}
              src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfalvvg3pjdj5e"
              alt=""
            />

            <div className={cx('description')}>
              <h4 className={cx('name')}>Tropical Playsuit</h4>
              <span className={cx('price')}>$100</span>
            </div>
          </div>
          <div className={cx('product')}>
            <img
              className={cx('img')}
              src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfalvvg3pjdj5e"
              alt=""
            />

            <div className={cx('description')}>
              <h4 className={cx('name')}>Tropical Playsuit</h4>
              <span className={cx('price')}>$100</span>
            </div>
          </div>
          <div className={cx('product')}>
            <img
              className={cx('img')}
              src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfalvvg3pjdj5e"
              alt=""
            />

            <div className={cx('description')}>
              <h4 className={cx('name')}>Tropical Playsuit</h4>
              <span className={cx('price')}>$100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
