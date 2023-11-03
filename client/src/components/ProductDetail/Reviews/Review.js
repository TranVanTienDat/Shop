import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ratingApi from '~/api/modules/ratingUser.api';
import RatingStar from '~/components/RatingStar/RatingStar';
import styles from './Review.module.scss';
const cx = classNames.bind(styles);
function Review({ productID }) {
  const [listComment, setListComment] = useState([]);
  useEffect(() => {
    const getComment = async () => {
      const { res } = await ratingApi.getCommentOfProductID({ productID });
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
        {listComment.length > 0 ? (
          listComment.map((item, i) => {
            return (
              <div key={i} className={cx('user')}>
                <img className={cx('avatar')} src={item.user.avatar} alt="" />
                <div className={cx('item')}>
                  <div className={cx('rating')}>
                    <h6 className={cx('name')}>{item.user.name} </h6>
                    <div className={cx('star')}>
                      <RatingStar value={item.rating} />
                    </div>
                  </div>
                  <div className={cx('time')}>{item.date}</div>
                  <div className={cx('comment')}>
                    <div className={cx('comment__list__img')}>
                      {item.images.length > 0 &&
                        item.images.map((item, i) => {
                          return (
                            <img
                              key={i}
                              className={cx('img')}
                              src={`http://localhost:5000/${item.name}`}
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
          })
        ) : (
          <div className={cx('text')}>Chưa có bình luận nào...</div>
        )}
      </div>
    </div>
  );
}

export default Review;
