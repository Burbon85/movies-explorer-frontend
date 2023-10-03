import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className='footer__block'>
        <p className='footer__date'>&copy; {new Date().getFullYear()}</p>
        <nav className='footer__nav'>
          <a
            className='footer__link'
            href='https://practicum.yandex.ru'
            rel='noreferrer'
            target='_blank'
          >
            Яндекс.Практикум
          </a>
          <a
            className='footer__link'
            href='https://github.com/Burbon85'
            rel='noreferrer'
            target='_blank'
          >
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;