import {
  faChevronRight,
  faFilterCircleDollar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

// Lazy loading image
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import Button from '~/components/Button/Button';
import { NavigateSearchParams } from '~/utils/updateSearchParams';
import styles from './SideBar.module.scss';
import productApi from '~/api/modules/product.api';
import { formatPrice } from '~/utils/func';

const cx = classNames.bind(styles);

function SideBar() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 0,
    category: '',
  });
  const [bestSellerProduct, setBestSellerProduct] = useState([]);

  useEffect(() => {
    const getBestSellerProduct = async () => {
      const { res } = await productApi.getBestseller();
      if (res) {
        setBestSellerProduct(res);
      }
    };
    getBestSellerProduct();
  }, []);

  const handleFilter = (field, value) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    const navigateSearch = NavigateSearchParams(params, filter);
    navigate({
      pathname: '/search',
      search: `?${createSearchParams(navigateSearch)}`,
    });
  };

  const handleNavigate = (name, _id) => {
    navigate(`/detail-product/${name}/${_id}`);
  };

  return (
    <div className={cx('wrapper')}>
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
          {bestSellerProduct.length > 0 &&
            bestSellerProduct.map((item, i) => {
              return (
                <div
                  className={cx('product')}
                  key={i}
                  onClick={() => handleNavigate(item.name, item._id)}
                >
                  <LazyLoadImage
                    src={item.images[0]}
                    effect="blur"
                    width="64px"
                    height="64px"
                    alt=""
                    placeholderSrc={item.images[0]}
                    style={{ borderRadius: '4px' }}
                  />

                  <div className={cx('description')}>
                    <h4 className={cx('name')}>{item.name}</h4>
                    <span className={cx('price')}>
                      {formatPrice.format(item.selectProduct[0].newPrice)}
                    </span>
                  </div>
                </div>
              );
            })}
          {/* <div className={cx('product')}>
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
