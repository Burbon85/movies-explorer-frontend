import React from 'react';
import './Search.css';
import Checkbox from '../Checkbox/Checkbox';
// import search from '../../images/find.svg'

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
          <button className='search__button'>Найти</button>
          <span className='search__input-error'></span>
        </div>
        <Checkbox />
      </form>
    </section>
  );
}

export default Search;
