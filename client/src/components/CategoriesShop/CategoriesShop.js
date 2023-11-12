import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import productApi from '~/api/modules/product.api';
import { category } from '~/constants/category';
import Button from '../Button/Button';
import CardProduct from './CardProduct/CardProduct';
import styles from './CategoriesShop.module.scss';
import { Animate } from '~/features/Auth/Sign/SignIn';

const cx = classNames.bind(styles);
function CategoriesShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({ category: 'Giày', active: 0 });
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { res } = await productApi.getCategoriesProduct({
        category: item.category,
      });
      setLoading(false);
      if (res) {
        setProducts(res);
      }
    };
    fetchProducts();
  }, [item.category]);

  const handleCategories = (title, i) => {
    setItem({ category: title, active: i });
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <h1 className={cx('heading')}>Mặt hàng của chúng tôi</h1>
        <div className={cx('list__Product')}>
          <div className={cx('category')}>
            {category.map((data, i) => {
              return (
                <span
                  key={i}
                  className={cx('item', item.active === i ? 'active' : '')}
                  onClick={() => handleCategories(data.title, i)}
                >
                  {data.title}
                </span>
              );
            })}
          </div>
          {!loading ? (
            <div className={cx('products')}>
              {products.length > 0 &&
                products.map((data, i) => {
                  return (
                    <CardProduct
                      key={i}
                      _id={data?._id}
                      category={data?.categories?.[0]}
                      name={data?.name}
                      image={data?.images?.[0]}
                    />
                  );
                })}
            </div>
          ) : (
            <div className={cx('animate')}>
              <Animate />
            </div>
          )}

          <div className={cx('button')}>
            <Button large>Find out more</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

CategoriesShop.propTypes = {
  title: propTypes.string,
};

export default CategoriesShop;
