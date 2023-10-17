import {
  faChevronRight,
  faFilterCircleDollar,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '~/store/slice/searchParamsSlice';
import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

function SideBar() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    keyword: '',
    price: 0,
    category: '',
  });

  useEffect(() => {
    const { keyword, price, category } = filter;
    dispatch(setSearch({ keyword, price, category }));
  }, [filter, dispatch]);

  const handleFilter = (field, value) => {
    if (field === 'keyword') {
      if (!value.startsWith(' ')) {
        setFilter((prev) => ({ ...prev, [field]: value }));
      }
    } else {
      setFilter((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('search')}>
          <input
            className={cx('input')}
            placeholder="Search products"
            value={filter?.keyword}
            onChange={(e) => handleFilter('keyword', e.target.value)}
          />
          <FontAwesomeIcon
            className={cx('search__icon')}
            icon={faMagnifyingGlass}
          />
        </div>

        <div className={cx('rating')}>
          <div className={cx('rating__price')}>
            <div className={cx('filter')}>
              <span className={cx('heading')}>Price</span>
              <FontAwesomeIcon
                className={cx('icon')}
                icon={faFilterCircleDollar}
              />
            </div>
            <input
              className={cx('price__input')}
              type="range"
              min={0}
              max={100000}
              step={1}
              value={filter.price}
              onChange={(e) => handleFilter('price', e.target.value)}
            />
            <div className={cx('title')}>
              <span className={cx('text')}>Range</span>
              <span className={cx('text')}>$5-$20</span>
            </div>
          </div>
        </div>

        <div className={cx('product-categories')}>
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

        <div className={cx('product-featured')}>
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
    </div>
  );
}

export default SideBar;
