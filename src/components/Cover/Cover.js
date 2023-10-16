import React from 'react';
import { Link } from 'react-router-dom';
import './Cover.css';
import image from '../../images/text.svg'

function Cover() {
  return (
    <div className='cover'>
      <div className='cover__info'>
        <h1 className='cover__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <p className='cover__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a href='#project' className='cover__button'>Узнать больше</a>
      </div>
      <img
          className='cover__image'
          src={image}
          alt='логотип'
        />
    </div>
  );
}
export default Cover;