import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import styles from './CardProduct.module.scss';
const cx = classNames.bind(styles);
function CardProduct({ _id, name, category, image }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle towards product details
  const handleNavigate = () => {
    navigate(`/detail-product`);
  };

  // Handle more products to the cart

  return (
    <div className={cx('wrapper')}>
      <img className={cx('img')} src={image} alt="" />
      <div className={cx('body')}>
        <h5 className={cx('type')}>{category}</h5>
        <h1 className={cx('name')}>{name}</h1>
        <Button
          leftIcon
          circle
          icon={<FontAwesomeIcon icon={faArrowRight} />}
          onClick={handleNavigate}
        />
      </div>
    </div>
  );
}

CardProduct.propTypes = {
  image: propTypes.node,
  noImg: propTypes.node,
  name: propTypes.string,
  description: propTypes.string,
  price: propTypes.number,
  purchase: propTypes.number,
  evaluate: propTypes.number,
};

export default CardProduct;
