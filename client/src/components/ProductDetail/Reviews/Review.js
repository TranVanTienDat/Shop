import classNames from 'classnames/bind';
import RatingStar from '~/components/RatingStar/RatingStar';
import styles from './Review.module.scss';
import { useSelector } from 'react-redux';
import { userData } from '~/store/slice/selector';
import Button from '~/components/Button/Button';
import { useState } from 'react';
const cx = classNames.bind(styles);
function Review({ data }) {
  const { avatar } = useSelector(userData);
  const [comment, setComment] = useState('');
  console.log(comment);

  const handleaddComment = () => {};
  return (
    <div className={cx('wrapper')}>
      <div className={cx('heading')}>ĐÁNH GIÁ SẢN PHẨM</div>

      <div className={cx('box')}>
        <img src={avatar} className={cx('avatar')} alt="" />
        <div className={cx('comment')}>
          <input
            className={cx('comment__input')}
            placeholder="đánh giá sản phẩm"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button outline onClick={handleaddComment}>
            Bình luận
          </Button>
        </div>
      </div>
      <div className={cx('list')}>
        {data?.length > 0 &&
          data.map((item, i) => {
            return (
              <div key={i} className={cx('user')}>
                <img className={cx('avatar')} src={item.avatar} alt="" />
                <div className={cx('item')}>
                  <div className={cx('rating')}>
                    <h6 className={cx('name')}>{item.user} </h6>
                    <div className={cx('star')}>
                      <RatingStar value={item.rating} />
                    </div>
                  </div>
                  <div className={cx('time')}>12-01-2004</div>
                  <div className={cx('comment')}>
                    <div className={cx('comment__list__img')}>
                      {item.imgProduct.length > 0 &&
                        item.imgProduct.map((item, i) => {
                          return (
                            <img
                              key={i}
                              className={cx('img__result')}
                              src={item}
                              alt=""
                            />
                          );
                        })}
                    </div>
                    <p className={cx('text')}>{item.comment}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Review;
