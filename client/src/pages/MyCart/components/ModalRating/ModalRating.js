import classNames from 'classnames/bind';
import Modal from '~/components/Modal/Modal';

import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ratingApi from '~/api/modules/ratingUser.api';
import Button from '~/components/Button/Button';
import RatingStar from '~/components/RatingStar/RatingStar';
import {
  errMes,
  success,
  warning,
} from '~/constants/ToastMessage/ToastMessage';
import {
  setIsLoadingButton,
  setIsLoadingRating,
} from '~/store/slice/loadingSlice';
import { setRating } from '~/store/slice/ratingSlice';
import {
  ratingSelector,
  setGlobalLoading,
  userData,
} from '~/store/slice/selector';
import styles from './ModalRating.module.scss';

const cx = classNames.bind(styles);

function ModalRating() {
  const dispatch = useDispatch();
  const { isLoadingRating, productID } = useSelector(setGlobalLoading);
  const { rating } = useSelector(ratingSelector);
  const [loading, setLoading] = useState({ productID: '', loading: false });
  const { avatar } = useSelector(userData);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [ratingProduct, setRatingProduct] = useState({
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    setRatingProduct((prev) => ({ ...prev, rating: rating }));
  }, [rating]);

  useEffect(() => {
    if (isLoadingRating) {
      setLoading({ productID, loading: true });
    } else {
      setTimeout(() => {
        setLoading({ productID: '', loading: false });
      }, 200);
    }
  }, [isLoadingRating, productID]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length <= 5) {
      const urls = files.map((file) => URL.createObjectURL(file));
      setImageUrls(urls);
      setImages(files);
    } else {
      warning('Tối đa 5 ảnh');
    }
  };
  const handleAddComment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((item) => formData.append('images', item));
    formData.append('productID', loading.productID);
    formData.append('rating', ratingProduct.rating);
    formData.append('comment', ratingProduct.comment);
    dispatch(setIsLoadingButton({ isLoadingButton: true }));
    const { res, err } = await ratingApi.postComment(formData);
    dispatch(setIsLoadingButton({ isLoadingButton: false }));
    if (res) {
      success('Đánh giá thành công');
      dispatch(setIsLoadingRating({ isLoadingRating: false }));
      setRatingProduct({ rating: 5, comment: '' });
      dispatch(setRating({ rating: 5 }));
      setImageUrls([]);
    }
    if (err) {
      errMes(err.message);
    }
  };
  return (
    loading.loading && (
      <Modal>
        <div className={cx('heading')}>
          <span className={cx('title')}>Đánh giá sản phẩm</span>
          <FontAwesomeIcon
            icon={faRectangleXmark}
            className={cx('menu')}
            onClick={() =>
              dispatch(setIsLoadingRating({ isLoadingRating: false }))
            }
          />
        </div>
        <main className={cx('main')}>
          <div className={cx('box')}>
            <img src={avatar} className={cx('avatar')} alt="" />
            <input
              className={cx('comment')}
              placeholder="đánh giá sản phẩm"
              value={ratingProduct.comment}
              onChange={(e) =>
                setRatingProduct((prev) => ({
                  ...prev,
                  comment: e.target.value,
                }))
              }
            />
          </div>
          <div className={cx('rating')}>
            <RatingStar onClick sizeStar />
          </div>
          <div className={cx('list__image')}>
            {imageUrls.length > 0 &&
              imageUrls.map((data, i) => {
                return (
                  <img key={i} src={data} alt="" className={cx('image')} />
                );
              })}
          </div>

          <div className={cx('main_file')}>
            <div className={cx('file__input')}>
              <label htmlFor="input" className={cx('flex')}>
                <h4 className={cx('title')}>Hình ảnh</h4>
                <FontAwesomeIcon icon={faCameraRetro} className={cx('icon')} />
              </label>
              <input
                id="input"
                type="file"
                name="images"
                onChange={handleFileUpload}
                className={cx('input')}
                multiple
                accept="image/*"
                max={5}
              />
            </div>

            <span className={cx('note')}>Tối đa 5 ảnh</span>
          </div>
          <div className={cx('button')}>
            <Button large onClick={handleAddComment}>
              Đăng
            </Button>
          </div>
        </main>
      </Modal>
    )
  );
}

export default ModalRating;
