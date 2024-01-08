import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RelatedProducts.module.scss';
// Skeleton
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import productApi from '~/api/modules/product.api';
import { formatPrice } from '~/utils/func';
const cx = classNames.bind(styles);

function RelatedProducts({ categories, productID }) {
  const navigate = useNavigate();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getRelatedProducts = async () => {
      setIsLoading(true);
      const { res, err } = await productApi.getRelatedProducts({
        related: categories,
        _id: productID,
      });
      setIsLoading(false);
      if (res) {
        setRelatedProduct(res);
      }
      if (err) {
        console.log(err);
      }
    };
    getRelatedProducts();
  }, [categories, productID]);
  return (
    <div className={cx('wrapper')}>
      <h4 className={cx('title')}>Sản phẩm tương tự</h4>
      <div className={cx('list')}>
        {!isLoading ? (
          relatedProduct.map((item, i) => {
            return (
              <div
                key={i}
                className={cx('product')}
                onClick={() =>
                  navigate(`/detail-product/${item.name}/${item._id}`)
                }
              >
                <img className={cx('img')} src={item.images[0]} alt="" />
                <h6 className={cx('name')}>{item.name}</h6>
                <div className={cx('price')}>
                  {`${formatPrice.format(item.selectProduct[0]?.newPrice)}đ`}
                </div>
              </div>
            );
          })
        ) : (
          <SkeletonRelatedProduct />
        )}
      </div>
    </div>
  );
}
export default RelatedProducts;

export const SkeletonRelatedProduct = () => {
  return Array(3)
    .fill(0)
    .map((item, i) => {
      return (
        <div key={i}>
          <Skeleton style={{ paddingTop: '100%' }} />
          <Skeleton style={{ margin: '10px 0' }} />
          <Skeleton width={100} />
        </div>
      );
    });
};
