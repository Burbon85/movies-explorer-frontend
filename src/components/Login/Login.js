import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';
import Preloader from '../../utils/Preloader/Preloader';
import useValidation from '../../utils/configs/ValidationForm';

function Login({ ...props }) {
  const { errors, values, isValid, handleChange, resetValidation } =
  useValidation();

  useEffect(() => {
    resetValidation();
  }, [resetValidation]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onLoginUserData({
      email: values.email,
      password: values.password,
    });
  }
  return (
    <div className='login'>
      <Link className='login__link' to='/'>
        <img className='login__logo' src={logo} alt='логотип' />
      </Link>
      <h1 className='login__header'>Рады видеть!</h1>
      <form className='login__form' noValidate onSubmit={handleSubmit}>
      {props.isLoading ? <Preloader /> : ''}
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
            value={values.email || ''}
            onChange={handleChange}
            pattern="^[A-Za-z0-9_.+\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-.]+$"
          />
          <span className={`login__input-error ${
            !isValid && errors.email ? 'login__input-error_active' : ''
          }`}>{errors.email || ''}</span>
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
            minLength='8'
            maxLength='60'
            value={values.password || ''}
            onChange={handleChange}
          />
          <span className={`login__input-error ${
            !isValid && errors.password ? 'login__input-error_active' : ''
          }`}>{errors.password || ''}</span>
        </label>
        <button type='submit' className={`login__enter ${
          !isValid && errors ? 'login__enter_disabled' : ''}`} disabled={!isValid}>Войти
        </button>
      </form>
      <div className='login__register'>
        <p className='login__register-info'>Ещё не зарегистрированы?</p>
        <Link className='login__register-link' to='/signup'>Регистрация</Link>
      </div>
    </div>
  )
}

export default Login;
