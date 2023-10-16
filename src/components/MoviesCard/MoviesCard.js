import React, {useState} from 'react';
import './MoviesCard.css';
import { Link, useLocation } from 'react-router-dom';
import durationMovie from '../../utils/configs/DurationMovie';

function MoviesCard({ isSavedMovie, movie, savedMovies, onSave, onDelete }) {
  const { nameRU, image, duration } = movie;
  const movieDuration = durationMovie(duration);
  const location = useLocation();

  let isClick = false;
  let clickId;
  isClick = savedMovies.some((savedMovie) => {
    if (savedMovie.movieId === movie.movieId) {
      clickId = savedMovie._id;
      return true;
    }
  })
  const cardButtonClickClassName = ( 
    `card__button ${isClick && 'card__button_active'}`
  );
  return (
      <div className='card'>
        <a className='card__trailer' href={movie.trailerLink} target='_blank' rel='noreferrer'>
          <img className='card__image' src={image} alt={nameRU} />
        </a>
        <figcaption className='card__figcaption'>
          <h2 className='card__title'>{nameRU}</h2>
            {location.pathname === '/movies' && (
            <button
              className={cardButtonClickClassName}
              name='card__button'
              type='button'            
              onClick={() => {
                isClick || isSavedMovie ? onDelete(movie._id ? movie._id : clickId) : onSave(movie);
              }}
            ></button>)}

          {location.pathname === '/saved-movies' && (
              <button
                className='card__button card__button-delete'
                name='card__delete'
                type='button'
                onClick={() => {
                  isSavedMovie = onDelete(movie._id);
                }}
              >
              </button>
            )}
        </figcaption>        
        <p className='card__duration'>{movieDuration}</p>
      </div>
  );
}

export default MoviesCard;
