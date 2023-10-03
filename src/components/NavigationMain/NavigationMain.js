import React, { useState } from 'react';
import './NavigationMain.css';
import { Link, useLocation } from 'react-router-dom';
import profile from '../../images/icon.svg'
import burgerMain from '../../images/burger-main.svg';
import close from '../../images/close.svg';

function NavigationMain() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='navigation-main'>
        {/* <div className='navigation-main__authorized'>
          <div className='navigation-main__links'>
            <Link className='navigation-main__link navigation-main__link-film' to='/movies'>Фильмы</Link>
            <Link className='navigation-main__link' to='/saved-movies'>Сохранённые фильмы</Link>
          </div>
          <Link to='/profile' className='navigation-main__link navigation__link-account'>
            <button className='navigation-main__account'>Аккаунт
              <div className='navigation-main__background'>
                <img
                  className='navigation-main__img'
                  src={profile}
                  alt='icon'
                />
              </div>
            </button>
            </Link>
        </div> */}
        <section className={ isMenuOpen ? 'navigation-main__bacground' : 'navigation-main__bacground-none' }>
        <div
          className={
            isMenuOpen
              ? ['navigation-main__menu','navigation-main__menu_active'].join(' ')
              : 'navigation-main__menu'
          }
        >
          <div className='navigation-main__links'>
            <Link
              className={
                isMenuOpen
                  ? ['navigation-main__link && navigation-main__link-film']
                  : ['navigation-main__link-disabled']
              }
              to='/'
            >
              Главная
            </Link>
            <Link
              className='navigation-main__link navigation-main__link-film'
              to='/movies'
            >
              Фильмы
            </Link>
            <Link className='navigation-main__link' to='/saved-movies'>
              Сохранённые фильмы
            </Link>
          </div>
          <Link to='/profile' className='navigation-main__link navigation-main__link-account'>
            <button className='navigation-main__account' type='button'>Аккаунт
              <div className='navigation-main__background-account'>
                <img
                  className='navigation-main__img'
                  src={profile}
                  alt='иконка'
                />
              </div>
            </button>
          </Link>
        </div>
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='burger-menu-main'
        >
          {isMenuOpen ? (
            <img
              className='burger-menu-main__button burger-menu-main__button-close'
              src={close}
              alt='крестик'
            />
          ) : (
            <img
              className='burger-menu-main__button'
              src={burgerMain}
              alt='иконка меню'
            />
          )}
        </div>
      </section>
    </nav>
  );
}

export default NavigationMain;
