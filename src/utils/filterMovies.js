import { SHORT_FILMS } from './constants/constants';

export const filterFilms = ({ movies, savedMovies, keyword, isCheckboxActive }) => {
  const filterMovies = [];

  keyword = keyword.toLowerCase().replace(/^\s+|\s+$|\s+(?=\s)/g, "");

  movies.forEach((movie) => {
    if (movie.nameRU.toLowerCase().includes(keyword) && (isCheckboxActive ? movie.duration <= SHORT_FILMS : true)) {
      const savedMovie = savedMovies.find((savedMovie) => savedMovie.movieId === movie.movieId);
      if (savedMovie) {
        movie.liked = savedMovie._id;
      }

      filterMovies.push(movie);
    }
  })

  return filterMovies;
}