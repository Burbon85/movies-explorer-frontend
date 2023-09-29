import React, { useEffect, useState  } from 'react';
import './Search.css';
import useValidation from '../../utils/configs/ValidationForm';

function Search({ handleSearch, handleCheckboxClick, onClick, searchRequest, checkbox }) {
  const { errors, values, isValid, handleChange, resetValidation } =
    useValidation();
  const { title } = values;
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    resetValidation({ title: searchRequest });
  }, [searchRequest]);

  function handleSearchFormClick(e) {
    e.preventDefault();
    handleSearch(title);
  }

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onClick(newValue);
  };

  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleSearchFormClick} noValidate>
        <div className='search__block'>
          <input
            className='search__input'
            type='text'
            placeholder='Фильм'
            required
            name='title'
            onChange={handleChange}
            value={values.title || ''}
          />
          <button className='search__button' type='submit'>Найти</button>
          <span className='search__input-error'></span>
        </div>
        <div className='checkbox'>
          <label className='checkbox__checkbox'>
            <input
              type='checkbox'
              className='checkbox__checkbox-click'
              // onChange={(e) => onClick(e.target.checked)}
              // onClick={handleCheckboxClick}
              onChange={handleCheckboxChange}
              checked={checkbox}
            />
            <div className='checkbox__checkbox-name'></div>
          </label>
          Короткометражки
        </div>
      </form>
    </section>
  );
}

export default Search;
