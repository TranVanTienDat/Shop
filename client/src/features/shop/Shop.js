import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '~/api/productsApi';
import { useDebounce } from '~/hook/debounce';
import { searchParams } from '~/store/slice/selector';
import { Animate } from '../Auth/Sign/LogIn';
import styles from './Shop.module.scss';
import SideBar from './SideBar/SideBar';
import Card from './card/Card';
const cx = classNames.bind(styles);
function ShopFood() {
  const dispatch = useDispatch();
  const { keyword, price, category } = useSelector(searchParams);
  const debounceKeyword = useDebounce(keyword);
  const [listProduct, setListProduct] = useState([]);
  const [currentItemPage, setCurrentItemPage] = useState({
    current: parseInt(localStorage.getItem('currentPage')) || 1,
    status: true,
  });
  const [getTotalPage, setGetTotalPage] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const currentPage = currentItemPage.status ? 1 : currentItemPage.current;
      setIsLoading(true);
      const response = await getProducts(
        debounceKeyword,
        price,
        category,
        currentPage,
        3
      );
      if (response) {
        const { products, totalPages } = response.data;
        setListProduct(products);
        const listPage = [];
        Array.from({ length: totalPages }).forEach((_, i) => {
          listPage.push(i + 1);
        });
        setGetTotalPage(listPage);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, [dispatch, debounceKeyword, price, category, currentItemPage]);

  // Lưu lại giá trị cũ
  const currentMemo = useMemo(() => {
    return {
      debounceKeyword,
      price,
      category,
      status: true,
    };
  }, [debounceKeyword, price, category]);

  useEffect(() => {
    setCurrentItemPage({ current: 1, status: true });
  }, [currentMemo]);

  //  handle
  const handleNavigation = (value) => {
    setCurrentItemPage({ current: parseInt(value), status: false });
    localStorage.setItem('currentPage', value);
  };
  return (
    <div className={cx('shop')}>
      <div className={cx('sidebar')}>
        <SideBar />
      </div>
      <div className={cx('shop__list')}>
        {!isLoading ? (
          listProduct.length > 0 ? (
            <div>
              <div className={cx('products')}>
                {listProduct.map((data, i) => {
                  return <Card key={i} {...data} />;
                })}
              </div>

              <div className={cx('page')}>
                <div className={cx('navigation')}>
                  {getTotalPage.length > 0 &&
                    getTotalPage.map((item, i) => {
                      return (
                        <button
                          key={i}
                          className={cx(
                            'button',
                            currentItemPage.current === item
                              ? 'button__active'
                              : null
                          )}
                          value={item}
                          onClick={(e) => handleNavigation(e.target.value)}
                        >
                          {item}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <div className={cx('no-product')}>không tìm thấy sản phẩm...</div>
          )
        ) : (
          <div className={cx('animate')}>
            <Animate />
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopFood;
