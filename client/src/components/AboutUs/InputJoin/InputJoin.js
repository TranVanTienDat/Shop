import classNames from 'classnames/bind';
import styles from './InputJoin.module.scss';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button/Button';
const cx = classNames.bind(styles);
function InputJoin() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('join')}>
          <h1 className={cx('heading')}>Join Our News Letters</h1>
          <p className={cx('text')}>
            Leverage agile frameworks to provide a robust synopsis for high
            level overviews. Iterative approaches to corporate strategy foster{' '}
          </p>

          <div className={cx('send')}>
            <input
              className={cx('input')}
              placeholder="Insert your mail here"
            />
            <span className={cx('button')}>
              <Button
                leftIcon
                icon={<FontAwesomeIcon icon={faChevronRight} />}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputJoin;
