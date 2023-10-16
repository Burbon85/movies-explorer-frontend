import React, { useState, useEffect } from 'react';
import './Saved.css';
import HeaderMain from '../HeaderMain/HeaderMain';
import Search from '../Search/Search';
import Footer from '../Footer/Footer';
import MoviesList from '../MoviesList/MoviesList';
import {
  WINDOW_WIDTH_1140,
  WINDOW_WIDTH_690,
  MOVIES_12_FILMS,
  MOVIES_8_FILMS,
  MOVIES_5_FILMS,
  MOVIES_4_MORE_FILMS,
  MOVIES_3_MORE_FILMS,
  MOVIES_2_MORE_FILMS,
  SHORT_FILMS,
} from '../../utils/constants/constants';
import useWindowWidth from '../../utils/configs/WindowWidth';
import Preloader from '../../utils/Preloader/Preloader';
import InfoTooltip from '../Infotooltip/InfoTooltip';
import errorImage from '../../images/err.svg';

function Saved({ initialMovies, onSave, onDelete, savedMovies }) {
  const [isLoading, setIsLoading] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [infoTooltipText, setInfoTooltipText] = useState('');
  const [shotMovies, setShortMovies] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);
  const [moviesToInitialRender, setMoviesToInitialRender] = useState({
    current: 0,
    next: 0,
  });
  const { width } = useWindowWidth();

  useEffect(() => {
    setFoundMovies(initialMovies);
  }, [])

  useEffect(() => {
    searchMoviesHandler();
  }, [searchRequest, isCheckboxActive]);

  useEffect(() => {
    filterShortMovies(initialMovies);
  }, [foundMovies, searchRequest]);

  useEffect(searchMoviesHandler, [initialMovies])

  useEffect(() => {
    resize()
  }, [width]);

  function searchMoviesHandler() {
    handleSearch(initialMovies, searchRequest);
  }

  function handleSearch(movies, keyword) {
    const filteredMovies = handleFilter(movies, keyword);
    const filteredShortMovies = filterShortMovies(filteredMovies);
    setFoundMovies(filteredMovies)
    setShortMovies(filteredShortMovies)
  }

  function handleFilter(movies, keyword) {
    const loweredKeyword = keyword.toLowerCase().trim();
    return movies.filter((movie) => {
      return movie.nameRU.toLowerCase().indexOf(loweredKeyword) !== -1 ||
        movie.nameEN.toLowerCase().indexOf(loweredKeyword) !== -1
    });
  }

  function filterShortMovies(foundedMovies) {
    return foundedMovies.filter((movie) => movie.duration <= SHORT_FILMS)
  }
  function handleCheckboxClick(value) {
    setIsCheckboxActive(value);
  }

  function closePopup() {
    setInfoTooltipPopupOpen(false);
  }

  function resize() {
    if (width >= WINDOW_WIDTH_1140) {
      setMoviesToInitialRender({
        current: MOVIES_12_FILMS,
        next: MOVIES_4_MORE_FILMS,
      });
    } else if (width > WINDOW_WIDTH_690 && width < WINDOW_WIDTH_1140) {
      setMoviesToInitialRender({
        current: MOVIES_12_FILMS,
        next: MOVIES_3_MORE_FILMS,
      })
    } else if (width < WINDOW_WIDTH_690) {
      setMoviesToInitialRender({
        current: MOVIES_5_FILMS,
        next: MOVIES_2_MORE_FILMS,
      });
    } else {
      setMoviesToInitialRender({
        current: MOVIES_8_FILMS,
        next: MOVIES_2_MORE_FILMS,
      });
    }
  }

  function handleMoreButtonClick() {
    setMoviesToInitialRender({
      current: moviesToInitialRender.current + moviesToInitialRender.next,
      next: moviesToInitialRender.next,
    });
  }

  const getMoviesList = () => {
    if (!searchRequest) {
      return isCheckboxActive ? shotMovies : initialMovies;
    }
    return isCheckboxActive ? shotMovies : foundMovies;
  };

  return (
    <>
      <header className='main-header'>
        <HeaderMain />
      </header>
      <main className='movies-main'>
        <Search
          handleSearch={setSearchRequest}
          handleCheckboxClick={handleCheckboxClick}
          searchRequest={searchRequest}
          checkbox={isCheckboxActive}
        />
        {isLoading ? (
          <Preloader />
        ) : (<MoviesList
          movies={getMoviesList()}
          isSavedMovie={true}
          onSave={onSave}
          onDelete={onDelete}
          savedMovies={savedMovies}
          isLoading={isLoading}
          onClick={handleMoreButtonClick}
          limit={moviesToInitialRender.current}
        />
        )}
        <div className='movies-main__block'></div>
      </main>
      <footer>
        <Footer />
      </footer>

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        title={infoTooltipText}
        onClose={closePopup}
        image={errorImage}
      />
    </>
  )
}

export default Saved;