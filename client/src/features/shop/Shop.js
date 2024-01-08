import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import productApi from '~/api/modules/product.api';
import images from '~/assets/images';
import { LoadingAnimate } from '~/components/Loading/LoadingGlobal';
import {
  NavigateSearchParams,
  updateSearchParams,
} from '~/utils/updateSearchParams';
import styles from './Shop.module.scss';
import SideBar from './SideBar/SideBar';
import Card from './card/Card';
const cx = classNames.bind(styles);
function Shop() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [totalPage, setTotalPage] = useState();
  const [isLoading, setIsLoading] = useState();
  const [listProduct, setListProduct] = useState([]);
  const [currentItemPage, setCurrentItemPage] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      window.scrollTo(0, 0);
      setIsLoading(true);
      const page = params.get('numberPage');
      setCurrentItemPage(parseInt(page));
      const searchParams = updateSearchParams(params);
      const { res } = await productApi.getProducts({
        ...searchParams,
      });
      if (res) {
        const { products, totalPages } = res;
        setListProduct(products);
        setTotalPage(totalPages);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, [params]);

  //  handle pagination
  const handlePageClick = (event) => {
    const newOffset = event.selected;
    const navigateSearch = NavigateSearchParams(params, undefined, newOffset);

    navigate({
      pathname: '/search',
      search: `?${createSearchParams(navigateSearch)}`,
    });
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

                <ReactPaginate
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageCount={totalPage}
                  forcePage={currentItemPage}
                  previousLabel="<"
                  className={'pagination'}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName={'active'}
                  renderOnZeroPageCount={null}
                />
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
