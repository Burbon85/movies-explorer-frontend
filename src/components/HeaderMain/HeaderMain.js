import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderMain.css';
import logo from '../../images/logo.svg';
import NavigationMain from '../NavigationMain/NavigationMain';

function HeaderMain() {
  return (
    <header className='header-main'>
      <Link to='/'>
        <img
          className='header-main__logo'
          src={logo}
          alt='логотип'
        />
      </Link>
      <NavigationMain />
    </header>
  );
}
export default HeaderMain;