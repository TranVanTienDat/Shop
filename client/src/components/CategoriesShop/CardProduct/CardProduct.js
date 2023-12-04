import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import styles from './CardProduct.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
const cx = classNames.bind(styles);
function CardProduct({ _id, name, category, image }) {
  const navigate = useNavigate();

  return (
    <div className={cx('wrapper')}>
      <LazyLoadImage
        src={image}
        className={cx('img')}
        effect="blur"
        width="100%"
        alt=""
        placeholderSrc={image}
      />
      <div className={cx('body')}>
        <span className={cx('type')}>{category}</span>
        <h4 className={cx('name')}>{name}</h4>
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
