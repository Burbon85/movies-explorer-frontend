import React from 'react';
import './Student.css';
import me from '../../images/Polish_20210203_202743758.jpg';

function Student() {
  return (
    <section className='student'>
      <h2 className='student__title'>Студент</h2>
      <div className='student__info'>
        <div className='student__me'>
          <h3 className='student__name'>Артур</h3>
          <p className='student__subtitle'>Фронтенд-разработчик, 38 лет</p>
          <p className='student__text'>
          Я живу в Москве. Окончил Московский институт управления в 2009 году по специальности "Финансы и кредит".Затем работал в Гос учреждении предоставляющем услуги для населения в должности заместителя директора.
          Решил поменять сферу деятельности ,прошел курс обучения на веб-разработчика.
          </p>
          <a
            className='student__git'
            href='https://github.com/Burbon85'
            rel='noreferrer'
            target='_blank'
          >
            Github
          </a>
        </div>
        <img className='student__img' src={me} alt='фото студента, выполневшего дипломный проект' />
      </div>
      <div className='student__portfolio'>
        <h4 className='student__portfolio-title'>Портфолио</h4>
        <p className='student__portfolio-text'>
          <a 
            className='student__portfolio-link'
            href='https://github.com/Burbon85/how-to-learn-2'
            rel='noreferrer'
            target='_blank'>Статичный сайт
            <span className='student__portfolio-logo'></span>
          </a>
        </p>
        <p className='student__portfolio-text'>
          <a 
            className='student__portfolio-link'
            href='https://burbon85.github.io/Russian-traval/'
            rel='noreferrer'
            target='_blank'>Адаптивный сайт
            <span className='student__portfolio-logo'></span>
          </a>
        </p>
        <p className='student__portfolio-text'>
          <a 
            className='student__portfolio-link'
            href='https://mesto-practicum.nomoreparties.co'
            rel='noreferrer'
            target='_blank'>Одностраничное приложение
            <span className='student__portfolio-logo'></span>
          </a>
        </p>        
      </div>
    </section>
  );
}

export default Student;
