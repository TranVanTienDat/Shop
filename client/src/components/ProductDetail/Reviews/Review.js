import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ratingApi from '~/api/modules/ratingUser.api';

import RatingStar from '~/components/RatingStar/RatingStar';
import styles from './Review.module.scss';
import SkeletonCard from './SkeletonCard/SkeletonCard';
const cx = classNames.bind(styles);
function Review({ productID }) {
  const [listComment, setListComment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getComment = async () => {
      setIsLoading(true);
      const { res } = await ratingApi.getCommentOfProductID({ productID });
      setIsLoading(false);
      if (res) {
        setListComment(res[0].data);
      }
    };
    getComment();
  }, [productID]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('heading')}>ĐÁNH GIÁ SẢN PHẨM</div>

      <div className={cx('list')}>
        {!isLoading ? (
          listComment.length > 0 ? (
            listComment.map((item, i) => {
              return (
                <div key={i} className={cx('user')}>
                  <img className={cx('avatar')} src={item.user.avatar} alt="" />

                  <div className={cx('item')}>
                    <div className={cx('info')}>
                      <h6 className={cx('name')}>{item.user.name}</h6>
                      <div className={cx('time')}>{item.date}</div>
                    </div>
                    <div className={cx('star')}>
                      <RatingStar value={item.rating} />
                    </div>

                    <div className={cx('comment')}>
                      <div className={cx('comment__list__img')}>
                        {item.images.length > 0 &&
                          item.images.map((item, i) => {
                            return (
                              <img
                                key={i}
                                className={cx('img')}
                                src={item.data}
                                alt={item.name}
                              />
                            );
                          })}
                      </div>
                      <p className={cx('text')}>{item.comment}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <span className={cx('text')}>Không có bình luận</span>
          )
        ) : (
          <SkeletonCard />
        )}
      </div>
    </div>
  );
}

export default Review;
