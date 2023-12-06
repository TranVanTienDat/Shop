import classNames from 'classnames/bind';
import styles from './RelatedProducts.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// Skeleton
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import productApi from '~/api/modules/product.api';
import { formatPrice } from '~/hook/func';
const cx = classNames.bind(styles);

export function RelatedProducts({ categories }) {
  const navigate = useNavigate();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getRelatedProducts = async () => {
      setIsLoading(true);
      const { res, err } = await productApi.getRelatedProducts({
        related: categories,
      });
      if (res) {
        setRelatedProduct(res);
      }
      if (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getRelatedProducts();
  }, [categories]);
  return (
    <div className={cx('wrapper')}>
      <h4 className={cx('title')}>Top sản phẩm bán chạy</h4>
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
                  {`${formatPrice.format(
                    item.selectProduct.listProduct[0].newPrice
                  )}đ`}
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

export function SkeletonRelatedProduct() {
  return Array(3)
    .fill(0)
    .map((item, i) => {
      return (
        <div key={i} className={cx('product')}>
          <Skeleton height={70} className={cx('img')} />
          <Skeleton />
          <Skeleton width={70} />
        </div>
      );
    });
}
