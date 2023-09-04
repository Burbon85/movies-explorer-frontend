import React from 'react';
import './Search.css';

function Search() {
  return (
    <section className='search'>
      <form className='search__form'>
        <div className='search__block'>
          <input
            className='search__input'
            type='text'
            placeholder='Фильм'
            required
          />
          <button className='search__button' type='button'>Найти</button>
          <span className='search__input-error'></span>
        </div>
        <div className='checkbox'>
        <label className='checkbox__checkbox'>
          <input
            type='checkbox'
            className='checkbox__checkbox-click'
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
