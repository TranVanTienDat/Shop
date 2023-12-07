import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import Star from '~/components/RatingStar/RatingStar';

// Lazy loading image
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import { formatPrice } from '~/hook/func';
import styles from './Card.module.scss';
const cx = classNames.bind(styles);
function Card({ name, sold, rating, selectProduct, _id, images }) {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate(`/detail-product/${name}/${_id}`);
  };

  const first = selectProduct[0];

  return (
    <div className={cx('wrapper')}>
      <LazyLoadImage
        src={images[0]}
        className={cx('img')}
        effect="blur"
        width="100%"
        alt=""
        placeholderSrc={images[0]}
        onClick={handleNav}
      />
      <div className={cx('info')}>
        <h1 className={cx('name')}>{name}</h1>
        <div className={cx('evaluate')}>
          <Star value={rating} />
        </div>
        <div className={cx('footer')}>
          <span className={cx('price')}>
            {formatPrice.format(first?.newPrice)}
          </span>
          <div className={cx('quantity')}>Bán {sold}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
