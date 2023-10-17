import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import Modal from '~/components/Modal/Modal';
import { useDebounce } from '~/hook/debounce';
import { addIsModal } from '~/store/slice/infoDataUser';
import { userData } from '~/store/slice/selector';
import styles from './ModalAddress.module.scss';
const cx = classNames.bind(styles);
function ModalAddress() {
  const dispatch = useDispatch();
  const { isModal } = useSelector(userData);
  const [updateAddress, setUpdateAddress] = useState({
    addressCity: '',
    addressSpecific: '',
    name: '',
    numberPhone: '',
  });
  const [resultSearch, setResultSearch] = useState([]);
  const [displaySelectAddress, setDisplaySelectAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const deBounce = useDebounce(updateAddress.addressCity);

  useEffect(() => {
    if (isModal) {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  }, [isModal]);
  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/search?&q=${deBounce}&format=json&addressdetails=1&polygon_svg=0`
        );
        console.log(res.data);
        if (res.data.length > 0) {
          setResultSearch(res.data);
          setDisplaySelectAddress(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getApi();
  }, [deBounce]);
  const handleInput = (value, field) => {
    setUpdateAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    dispatch(addIsModal({ isModal: false }));
  };

  const handleGetAddress = (value) => {
    handleInput(value, 'addressCity');
    setDisplaySelectAddress(false);
  };

  return (
    loading && (
      <Modal>
        <div className={cx('heading')}>
          <span className={cx('title')}>Nhập địa chỉ nhận hàng</span>
          <FontAwesomeIcon
            icon={faRectangleXmark}
            className={cx('menu')}
            onClick={() => dispatch(addIsModal({ isModal: false }))}
          />
        </div>
        <div className={cx('main')}>
          <form className={cx('form')}>
            <div className={cx('field')}>
              <label htmlFor="inputCity" className={cx('title')}>
                Nhập huyện, thành phố
              </label>
              <input
                id="inputCity"
                type="text"
                className={cx('input__info')}
                placeholder="Find cities, districts"
                value={updateAddress.addressCity}
                onChange={(e) => handleInput(e.target.value, 'addressCity')}
              />
              {displaySelectAddress > 0 && (
                <ul className={cx('select')}>
                  {resultSearch.map((data, i) => {
                    return (
                      <li
                        key={i}
                        data-value={data.display_name}
                        onClick={() => handleGetAddress(data.display_name)}
                        className={cx('option')}
                      >
                        {data.display_name}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className={cx('field')}>
              <label htmlFor="inputCity" className={cx('title')}>
                Nhập địa chị cụ thể
              </label>
              <input
                id="inputCity"
                type="text"
                className={cx('input__info')}
                placeholder="Enter the name of city"
                value={updateAddress.addressSpecific}
                onChange={(e) => handleInput(e.target.value, 'addressSpecific')}
              />
            </div>
            <div className={cx('field')}>
              <label htmlFor="inputName" className={cx('title')}>
                Nhập họ tên nhận hàng
              </label>
              <input
                id="inputName"
                type="text"
                className={cx('input__info')}
                placeholder="Enter the specific address"
                value={updateAddress.name}
                onChange={(e) => handleInput(e.target.value, 'name')}
              />
            </div>
            <div className={cx('field')}>
              <label htmlFor="inputPhone" className={cx('title')}>
                Nhập số điện thoại
              </label>
              <input
                id="inputPhone"
                className={cx('input__info')}
                placeholder="Enter the specific address"
                value={updateAddress.numberPhone}
                onChange={(e) => handleInput(e.target.value, 'numberPhone')}
              />
            </div>
          </form>
          <Button marginLeft large>
            Use
          </Button>

          <div className={cx('text')}>
            <Link to="/" className={cx('link')} onClick={handleClose}>
              Log in?
            </Link>
            Select the address to receive goods
          </div>
        </div>
      </Modal>
    )
  );
}

export default ModalAddress;
