import React, { useState } from 'react';
import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';
import profile from '../../images/icon.svg';
import burger from '../../images/burger.svg';
import close from '../../images/close.svg'

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  function handleOpenBurger() {
    setIsMenuOpen(!isMenuOpen);
    window.scrollTo(0, 0);
  }
  return (
    <nav className='navigation'>

    {/* шапка для неавторизованного пользователя */}

        {/* <div className='navigation__unauthorized'>
          <Link to='/signup' className='navigation__unauthorized-link'>
            <button className='navigation__signup'>Регистрация</button>
          </Link>
          <Link to='/signin' className='navigation__unauthorized-link'>
            <button className='navigation__signin'>Войти</button>
          </Link>
        </div>  */}

        {/* шапка для авторизованного пользователя */}
        <section className={ isMenuOpen ? 'navigation__bacground' : 'navigation__bacground-none' }>
        <div
          className={
            isMenuOpen
              ? ['navigation__menu','navigation__menu_active'].join(' ')
              : 'navigation__menu'
          }
        >
          <div className='navigation__links'>
            <Link
              className={
                isMenuOpen
                  ? ['navigation__link && navigation__link-film']
                  : ['navigation__link-disabled']
              }
              to='/'
            >
              Главная
            </Link>
            <Link
              className='navigation__link navigation__link-film'
              to='/movies'
            >
              Фильмы
            </Link>
            <Link className='navigation__link' to='/saved-movies'>
              Сохранённые фильмы
            </Link>
          </div>
          <Link to='/profile' className='navigation__link navigation__link-account'>
            <button className='navigation__account' type='button'>Аккаунт
              <div className='navigation__background-account'>
                <img
                  className='navigation__img'
                  src={profile}
                  alt='иконка'
                />
              </div>
            </button>
          </Link>
        </div>
        <div
          onClick={handleOpenBurger}
          // onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='burger-menu'
        >
          {isMenuOpen ? (
            <img
              className='burger-menu__button burger-menu__button-close'
              src={close}
              alt='крестик'
            />
          ) : (
            <img
              className='burger-menu__button'
              src={burger}
              alt='иконка меню'
            />
          )}
        </div>
      </section>
    </nav>
  );
}

export default Navigation;
