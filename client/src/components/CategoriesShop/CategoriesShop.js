import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import styles from './CategoriesShop.module.scss';
import { category } from '~/constants/category';
import CardProduct from './CardProduct/CardProduct';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import { getCategoriesProduct } from '~/api/productsApi';

const cx = classNames.bind(styles);
function CategoriesShop({ title }) {
  const [products, setProducts] = useState([]);
  const [item, setItem] = useState({ category: 'dày', active: 0 });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getCategoriesProduct(item.category);
        if (response) {
          setProducts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [item.category]);

  const handleCategories = (title, i) => {
    setItem({ name: title, active: i });
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <h1 className={cx('heading')}>{title}</h1>
        <div className={cx('list__Product')}>
          <div className={cx('category')}>
            {category.map((data, i) => {
              return (
                <span
                  key={i}
                  className={cx('item', item.active === i ? 'active' : '')}
                  onClick={() => handleCategories(data, i)}
                >
                  {data.title}
                </span>
              );
            })}
          </div>
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
