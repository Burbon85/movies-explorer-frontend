import React, {useState} from 'react';
import './MoviesCard.css';
import { Link, useLocation } from 'react-router-dom';
import like from '../../images/like.svg';
import dislike from '../../images/dislike.svg';
import deleteBut from '../../images/delete.svg';

function MoviesCard({ movie }) {
  // const { image, nameRU, duration } = movie;
  const image = `https://api.nomoreparties.co/${movie.image.url}`;
  const [isButtonClick, setIsButtonClick] = useState(false);
  const location = useLocation();
  return (
      <div className='card'>
        <img className='card__image' src={image} alt={movie.nameRU} />
        <figcaption className='card__figcaption'>
          <h2 className='card__title'>{movie.nameRU}</h2>
            {location.pathname === '/movies' && (
            <button
              className='card__button card__button-active'
              name='card__button'
              type='button'
              onClick={() => setIsButtonClick(!isButtonClick)}
              > {isButtonClick ? (<img
              className='card__icon'
              src={like}
              alt='лайк'
              ></img>) : (<img
              className='card__icon'
              src={dislike}
              alt='лайк'
              ></img>) }
            </button>)}

          {location.pathname === '/saved-movies' && (
            <button
              className='card__button card__button-active'
              name='card__delete'
              type='button'
            >
              <img
              className='card__icon'
              src={deleteBut}
              alt='удаление'
              ></img>
            </button>)}
        </figcaption>        
        <p className='card__duration'>{movie.duration}</p>
      </div>
  );
}

export default MoviesCard;
