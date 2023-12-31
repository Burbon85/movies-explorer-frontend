import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <header className='header'>
      <Link to='/'>
        <img
          className='header__logo'
          src={logo}
          alt='логотип'
        />
      </Link>
      <Navigation />
    </header>
  );
}
export default Header;