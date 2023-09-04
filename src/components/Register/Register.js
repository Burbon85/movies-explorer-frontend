import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';

function Register() {
  return (
    <div className='signup'>
    <Link className='signup__link' to='/'>
      <img className='signup__logo' src={logo} alt='логотип' />
    </Link>
    <h1 className='signup__header'>Добро пожаловать!</h1>
    <form className='signup__form' noValidate>
    <label className='signup__label'>
          <p className='signup__info'>Имя</p>
          <input
            className='signup__input'
            name='text'
            id='text'
            type='text'
            placeholder='Виталий'
            required
            autoComplete='off'
            minLength='1'
            maxLength='30'
          />
          <span className='signup__input-error'></span>
        </label>
      <label className='signup__label'>
        <p className='signup__info'>E-mail</p>
        <input
          className='signup__input'
          name='email'
          id='email'
          type='email'
          placeholder='pochta@yandex.ru'
          required
          autoComplete='off'
        />
        <span className='signup__input-error'></span>
      </label>
      <label className='signup__label'>
        <p className='signup__info'>Пароль</p>
        <input
          className='signup__input signup__input-last'
          name='password'
          id='password'
          type='password'
          placeholder=''
          required
          autoComplete='off'
          minLength='8'
          maxLength='60'
        />
        <span className='signup__input-error'>Что-то пошло не так...</span>
      </label>
      <button className='signup__enter' type='submit'>Зарегистрироваться</button>
    </form>
    <div className='signup__register'>
      <p className='signup__register-info'>Уже зарегистрированы?</p>
      <Link className='signup__register-link' to='/signin'>Войти</Link>
    </div>
  </div>
  )
}

export default Register;