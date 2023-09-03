import React from 'react';
import './Checkbox.css';

function Checkbox() {
  return (
    <section className='checkbox'>
        <label className='checkbox__checkbox'>
          <input
            type='checkbox'
            className='checkbox__checkbox-click'
          />
          <div className='checkbox__checkbox-name'></div>
        </label>
      Короткометражки
    </section>
  );
}

export default Checkbox;
