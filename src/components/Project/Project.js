import React from 'react';
import './Project.css';

function Project() {
  return (
    <section className='project' id='project'>
      <h2 className='project__title'>О проекте</h2>
      <div className='project__info'>
        <div className='project__infoblock'>
          <h3 className='project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='project__paragraf'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='project__infoblock'>
          <h3 className='project__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='project__paragraf'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='project__plan'>
        <div className='project__plan-time'>
          <div className='project__plan-back'>1 неделя</div>
          <p className='project__plan-text'>Back-end</p>
        </div>
        <div className='project__plan-time '>
          <div className='project__plan-front'>4 недели</div>
          <p className='project__plan-text'>Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default Project;
