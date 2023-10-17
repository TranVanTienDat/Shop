import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDebounce } from '~/hook/debounce';
import styles from './Search.module.scss';
const cx = classNames.bind(styles);

function Search() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(
    localStorage.getItem('searchText') || ''
  );
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('inputValue') || 'All'
  );
  const ref = useRef();

  const handleInputOnchange = (e) => {
    localStorage.setItem('inputValue', e.target.value);
    setInputValue(e.target.value);
  };

  const handleOnchangeText = (e) => {
    const valueSearch = e.target.value;

    if (!valueSearch.startsWith(' ')) {
      setSearch(valueSearch);
      localStorage.setItem('searchText', valueSearch);
    }
  };
  const debounceValue = useDebounce(search);
  useEffect(() => {}, [dispatch, debounceValue]);
  return (
    <div className={cx('search')}>
      <input
        placeholder="search foods"
        ref={ref}
        value={search}
        onChange={handleOnchangeText}
      />

      <div className={cx('category')}>
        <form>
          <div>
            <input
              type="radio"
              id="category1"
              name="category"
              value="All"
              defaultChecked={inputValue === 'All'}
              onChange={handleInputOnchange}
            />
            <label htmlFor="category1">All</label>
          </div>
          <div>
            <input
              type="radio"
              id="category2"
              name="category"
              value="Foods"
              checked={inputValue === 'Foods'}
              onChange={handleInputOnchange}
            />
            <label htmlFor="category2">Foods</label>
          </div>
          <div>
            <input
              type="radio"
              id="category3"
              name="category"
              value="Drinks"
              checked={inputValue === 'Drinks'}
              onChange={handleInputOnchange}
            />
            <label htmlFor="category3">Drinks</label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
