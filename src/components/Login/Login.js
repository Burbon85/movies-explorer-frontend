import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';

function Login() {
  return (
    <div className='login'>
      <Link className='login__link' to='/'>
        <img className='login__logo' src={logo} alt='логотип' />
      </Link>
      <h2 className='login__header'>Рады видеть!</h2>
      <form className='login__form' noValidate>
        <label className='login__label'>
          <p className='login__info'>E-mail</p>
          <input
            className='login__input'
            name='email'
            id='email'
            type='email'
            placeholder='pochta@yandex.ru'
            required
            autoComplete='off'
          />
          <span className='login__input-error'></span>
        </label>
        <label className='login__label'>
          <p className='login__info'>Пароль</p>
          <input
            className='login__input'
            name='password'
            id='password'
            type='password'
            placeholder=''
            required
            autoComplete='off'
          />
          <span className='login__input-error'></span>
        </label>
      </form>
      <button className='login__enter' type='submit'>Войти</button>
      <div className='login__register'>
        <p className='login__register-info'>Ещё не зарегистрированы?</p>
        <Link className='login__register-link' to='/signup'>Регистрация</Link>
      </div>
    </div>
  )
}

export default Login;
