import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import productApi from '~/api/modules/product.api';
import images from '~/assets/images';
import InputJoin from '~/components/AboutUs/InputJoin/InputJoin';
import Banner from '~/components/Banner/Banner';
import { LoadingAnimate } from '~/components/Loading/LoadingGlobal';
import Card from '~/features/shop/card/Card';
import styles from './OrderOnline.module.scss';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const cx = classNames.bind(styles);

function OrderOnline() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const [isLoading, setIsLoading] = useState();
  const [totalPage, setTotalPage] = useState();
  const [listProduct, setListProduct] = useState([]);
  const [currentItemPage, setCurrentItemPage] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      window.scrollTo(0, 200);
      setIsLoading(true);
      const numberPage = searchParam.get('numberPage');
      const limit = searchParam.get('limit');
      setCurrentItemPage(parseInt(numberPage));
      const { res } = await productApi.getAllProduct({
        page: numberPage,
        limit: limit,
      });
      if (res) {
        const { products, totalPages } = res;
        setListProduct(products);
        setTotalPage(totalPages);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, [searchParam]);
  const handlePageClick = (event) => {
    const newOffset = event.selected;
    navigate({
      pathname: '/order-online',
      search: `?${createSearchParams({
        numberPage: newOffset,
        limit: 20,
      })}`,
    });
  };
  return (
    <div style={{ marginTop: '120px' }}>
      <Banner />
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
      <InputJoin />
    </div>
  );
}

export default OrderOnline;
