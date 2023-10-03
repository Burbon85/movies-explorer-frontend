import React from 'react';
import './MoviesList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesList({ movies, isOwner }) {
  const arrayCards = movies.slice(0, 12); 
  return (    
    <>
      <section className='movies'>
        {arrayCards.map((cardMovie) => (
          <MoviesCard movie={cardMovie} key={cardMovie.id} />
        ))}
      </section>
      {!isOwner && (
        <section className='button'>
          <button className='button__button' type='button'>Ещё</button>
        </section>
      )}
    </>
  );
}

export default MoviesList;
