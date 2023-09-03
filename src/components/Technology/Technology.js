import React from 'react';
import './Technology.css';

function Technology() {
  return (
    <section className='technology'>
      <h2 className='technology__title'>Технологии</h2>
      <h3 className='technology__subtitle'>7 технологий</h3>
      <p className='technology__text'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div className='technology__list'>
        <p className='technology__icon'>HTML</p>
        <p className='technology__icon'>CSS</p>
        <p className='technology__icon'>JS</p>
        <p className='technology__icon'>React</p>
        <p className='technology__icon'>Git</p>
        <p className='technology__icon'>Express.js</p>
        <p className='technology__icon'>mongoDB</p>
      </div>
    </section>
  );
}

export default Technology;