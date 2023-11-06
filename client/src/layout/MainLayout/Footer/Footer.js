import classNames from 'classnames/bind';
import images from '~/assets/images';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx('footer')}>
      <div className={cx('view')}>
        <div className={cx('customer')}>
          <img
            className={cx('img')}
            src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfalvvg3pjdj5e"
            alt=""
          />
          <div className={cx('element')}>
            <div className={cx('colum')}>
              <img className={cx('element__img')} src={images.logo} alt="" />

              <h4 className={cx('text')}>Privacy Policy</h4>
              <h4 className={cx('text')}>Terms and Condition</h4>
            </div>
            <h4 className={cx('text-end')}>
              @2020 TanahAir Studio. All rights reserved.
            </h4>
          </div>
        </div>
        <div className={cx('Social-Network')}>
          <img
            className={cx('icon')}
            src="https://cdn-icons-png.flaticon.com/128/3677/3677211.png"
            alt=""
          />
          <img
            className={cx('icon')}
            src="https://cdn-icons-png.flaticon.com/128/408/408707.png"
            alt=""
          />
          <img
            className={cx('icon')}
            src="https://cdn-icons-png.flaticon.com/128/3256/3256013.png"
            alt=""
          />
          <img
            className={cx('icon')}
            src="https://cdn-icons-png.flaticon.com/128/2504/2504965.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
