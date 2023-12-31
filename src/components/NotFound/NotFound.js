import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <main className='error'>
      <h1 className='error__title'>404</h1>
      <p className='error__subtitle'>Страница не найдена</p>
      <Link className='error__nav' to='/'>
        Назад
      </Link>
    </main>
  );
}

export default NotFound;
