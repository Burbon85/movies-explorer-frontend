import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound({ navigateBack }) {
  return (
    <main className='error'>
      <h1 className='error__title'>404</h1>
      <p className='error__subtitle'>Страница не найдена</p>
      <button className='error__nav' onClick={navigateBack}>
        Назад
      </button>
    </main>
  );
}

export default NotFound;
