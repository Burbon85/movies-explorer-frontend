import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';

import useValidation from '../../utils/configs/ValidationForm';
import Preloader from '../../utils/Preloader/Preloader';

function Register({ ...props }) {
  const { errors, values, isValid, handleChange, resetValidation } =
  useValidation();

  const navigate = useNavigate();

  useEffect(() => {
    resetValidation();
  }, [resetValidation]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegisterUserData({
      email: values.email,
      password: values.password,
      name: values.name,
    });
  }

  return (
    <div className='signup'>
    <Link className='signup__link' to='/'>
      <img className='signup__logo' src={logo} alt='логотип' />
    </Link>
    <h1 className='signup__header'>Добро пожаловать!</h1>
    <form className='signup__form' noValidate onSubmit={handleSubmit}>
    {props.isLoading ? <Preloader /> : ''}
    <label className='signup__label'>
          <p className='signup__info'>Имя</p>
          <input
            className='signup__input'
            name='name'
            id='name'
            type='text'
            placeholder='Виталий'
            required
            autoComplete='off'
            minLength='1'
            maxLength='30'
            value={values.name || ''}
            onChange={handleChange}
          />
          <span className={`signup__input-error ${
            !isValid && errors.name ? 'signup__input-error_active' : ''}`}>{errors.name || ''}</span>
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
          value={values.email || ''}
          onChange={handleChange}
          pattern="^[A-Za-z0-9_.+\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-.]+$"
        />
        <span className={`signup__input-error ${
            !isValid && errors.email ? 'signup__input-error_active' : ''}`}>{errors.email || ''}</span>
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
          value={values.password || ''}
          onChange={handleChange}
        />
        <span className={`signup__input-error ${
            !isValid && errors.password ? 'signup__input-error_active' : ''}`}>{errors.password || ''}</span>
      </label>
      <button type='submit' className={`signup__enter ${
            !isValid && errors ? 'signup__enter_disabled' : ''
          }`} disabled={!isValid}>Зарегистрироваться</button>
    </form>
    <div className='signup__register'>
      <p className='signup__register-info'>Уже зарегистрированы?</p>
      <Link className='signup__register-link' to='/signin'>Войти</Link>
    </div>
  </div>
  )
}

export default Register;