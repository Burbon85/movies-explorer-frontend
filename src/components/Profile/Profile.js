import './Profile.css';
import React from 'react';
import { Link } from 'react-router-dom';
import HeaderMain from '../HeaderMain/HeaderMain';

function Profile() {
  return (
    <>
      <header>
        <HeaderMain />
      </header>
      <main className='profile'>
        <h2 className='profile__title'>Привет, Виталий!</h2>
        <div className='profile__block'>
          <label className='profile__label profile__label-name'>
            <p className='profile__subtitle'>Имя</p>
            <input
              className='profile__input'
              type='text'
              placeholder='Виталий'
              required
            />
          </label>
          <label className='profile__label'>
            <p className='profile__subtitle'>E-mail</p>
            <input
              className='profile__input'
              type='email'
              placeholder='pochta@yandex.ru'
              required
            />
          </label>
        </div>
        <div className='profile__links'>
          <Link to='/' className='profile__link profile__link-redact'>
            Редактировать
          </Link>
          <Link to='/' className='profile__link'>
            Выйти из аккаунта
          </Link>
        </div>
      </main>
    </>
  );
}

export default Profile;