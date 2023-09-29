import React from 'react';
import './MoviesList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../utils/Preloader/Preloader';

function MoviesList({ movies, isSavedMovie, onSave, onDelete, savedMovies, isLoading, onClick, limit
}) {
  return (    
    <>
      <section className='movies'>
        {isLoading ? (
          <Preloader />) : (
          movies.map((movie, movieIndex) => {
            return (
              movieIndex < limit &&
              <MoviesCard
                isSavedMovie={isSavedMovie}
                movie={movie}                
                savedMovies={savedMovies}
                onSave={onSave}
                onDelete={onDelete}
                key={movie.movieId}
              />);
          })
        )}
      </section>
       {(movies.length > limit) && (
        <section className='button'>
          <button className='button__button' type='button' onClick={onClick}>Ещё</button> 
        </section>
      )}
    </>
  );
}

export default MoviesList;
