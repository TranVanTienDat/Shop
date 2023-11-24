import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import styles from './CardProduct.module.scss';
const cx = classNames.bind(styles);
function CardProduct({ _id, name, category, image }) {
  const navigate = useNavigate();

  return (
    <div className={cx('wrapper')}>
      <img className={cx('img')} src={image} alt="" />
      <div className={cx('body')}>
        <h5 className={cx('type')}>{category}</h5>
        <h3 className={cx('name')}>{name}</h3>
        <Button
          leftIcon
          circle
          ariaLabel="navigate"
          icon={<FontAwesomeIcon icon={faArrowRight} />}
          onClick={() => navigate(`/detail-product/${name}/${_id}`)}
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
