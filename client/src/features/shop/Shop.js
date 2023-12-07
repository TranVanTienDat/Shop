import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productApi from '~/api/modules/product.api';
import { searchParams } from '~/store/slice/selector';
import { LoadingAnimate } from '~/components/Loading/LoadingGlobal';
import styles from './Shop.module.scss';
import SideBar from './SideBar/SideBar';
import Card from './card/Card';
import images from '~/assets/images';
const cx = classNames.bind(styles);
function Shop() {
  const dispatch = useDispatch();
  const { keyword, minPrice, maxPrice, category, rating } =
    useSelector(searchParams);
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
      window.scrollTo(0, 200);
      setIsLoading(true);
      const { res } = await productApi.getProducts({
        keyword,
        minPrice,
        maxPrice,
        category,
        rating,
        page: currentPage,
        limit: 5,
      });
      if (res) {
        const { products, totalPages } = res;
        setListProduct(products);
        setGetTotalPage(totalPages);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, [
    dispatch,
    keyword,
    minPrice,
    maxPrice,
    category,
    rating,
    currentItemPage,
  ]);

  // Lưu lại giá trị cũ
  const currentMemo = useMemo(() => {
    return {
      keyword,
      minPrice,
      maxPrice,
      category,
      rating,
      status: true,
    };
  }, [keyword, minPrice, maxPrice, rating, category]);

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
      <div className={cx('inner')}>
        <SideBar />

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
                    {Array(getTotalPage)
                      .fill(0)
                      .map((item, i) => {
                        return (
                          <button
                            key={i}
                            className={cx(
                              'button',
                              currentItemPage.current === i + 1
                                ? 'button__active'
                                : null
                            )}
                            value={i + 1}
                            onClick={(e) => handleNavigation(e.target.value)}
                          >
                            {i + 1}
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            ) : (
              <img src={images.notSearch} alt="" className={cx('no-product')} />
            )
          ) : (
            <div className={cx('animate')}>
              <LoadingAnimate />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
