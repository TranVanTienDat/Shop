import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import Star from '~/components/RatingStar/RatingStar';
import { formatPrice } from '~/hook/func';
import styles from './Card.module.scss';
const cx = classNames.bind(styles);
function Card({ name, sold, rating, selectProduct, _id, images }) {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate(`/detail-product/${name}/${_id}`);
  };

  const first = selectProduct.listProduct[0];

  return (
    <div className={cx('wrapper')}>
      <img className={cx('img')} src={images[0]} alt="" onClick={handleNav} />
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
