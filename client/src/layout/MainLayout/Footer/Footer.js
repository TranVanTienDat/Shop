import classNames from 'classnames/bind';
import images from '~/assets/images';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx('footer')}>
      <div className={cx('inner')}>
        <div className={cx('brand')}>
          <img className={cx('logo')} src={images.logoWhite} alt="" />
          <p className={cx('text')}>
            Funding freemium long tail hypotheses first mover advantage assets
            ownership
          </p>
          <div className={cx('contact')}>
            <div className={cx('box')}>
              <FontAwesomeIcon icon={faEnvelope} className={cx('icon')} />
              <span className={cx('title')}>kimca@mail.com</span>
            </div>

            <div className={cx('box')}>
              <FontAwesomeIcon icon={faPhone} className={cx('icon')} />
              <span className={cx('title')}>+089 736 655</span>
            </div>
          </div>
        </div>

        <div className={cx('info')}>
          <div className={cx('column')}>
            <span className={cx('title')}>Services</span>
            <ul>
              <li className={cx('text')}>Web Hosting</li>
              <li className={cx('text')}>Domains</li>
              <li className={cx('text')}>Premium Hosting</li>
              <li className={cx('text')}>Private Server</li>
              <li className={cx('text')}>E-mail Hosting</li>
            </ul>
          </div>

          <div className={cx('column')}>
            <span className={cx('title')}>Services</span>
            <ul>
              <li className={cx('text')}>Web Hosting</li>
              <li className={cx('text')}>Domains</li>
              <li className={cx('text')}>Premium Hosting</li>
              <li className={cx('text')}>Private Server</li>
              <li className={cx('text')}>E-mail Hosting</li>
            </ul>
          </div>
          <div className={cx('column')}>
            <span className={cx('title')}>Services</span>
            <ul>
              <li className={cx('text')}>Web Hosting</li>
              <li className={cx('text')}>Domains</li>
              <li className={cx('text')}>Premium Hosting</li>
              <li className={cx('text')}>Private Server</li>
              <li className={cx('text')}>E-mail Hosting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
