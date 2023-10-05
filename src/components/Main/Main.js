import React,{ useState, useEffect } from 'react';
import './Main.css';
import HeaderMain from '../HeaderMain/HeaderMain';
import Search from '../Search/Search';
import Footer from '../Footer/Footer';
import MoviesList from '../MoviesList/MoviesList';
import InfoTooltip from '../Infotooltip/InfoTooltip';
import errorImage from '../../images/err.svg'

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

function Main({ initialMovies, onSave, onDelete, savedMovies }) {
  const [isLoading, setIsLoading] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [infoTooltipText, setInfoTooltipText] = useState('');
  const [shotMovies, setShotMovies] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);
  const [moviesToInitialRender, setMoviesToInitialRender] = useState({
    current: 0,
    next: 0,
  });
  const { width } = useWindowWidth();
  useEffect(() => {
    searchMoviesHandler();
    filterShotMovies();
  }, [searchRequest, isCheckboxActive]);

  useEffect(() => {
    checkFilmsLastRequest();
  }, []);

  useEffect(() => {
    resize();
  }, [width]);

  function filterShotMovies() {
    setShotMovies(handleFilter(foundMovies));
  }

  function handleFilter(movies) {
    return movies.filter((movie) => {
      return movie.duration <= SHORT_FILMS;
    });
  }

  async function searchMoviesHandler() {
    setIsLoading(true);
    setFoundMovies([]);
    try {
      if (searchRequest.length > 0) {
        const moviesToRender = await handleSearch(initialMovies, searchRequest);
        if (moviesToRender.length === 0) {
          setInfoTooltipText('Не найдено');
          setInfoTooltipPopupOpen(true);
        } else {
          setRequestToLocalStorage('lastRequest', searchRequest);
          setRequestToLocalStorage('filmsLastRequest', moviesToRender);
          setFoundMovies(moviesToRender);
          setRequestToLocalStorage('checkbox', isCheckboxActive);
        }
      }
      return;
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSearch(movies, keyword) {
    return movies.filter((movie) => {
      const a = keyword.toLowerCase().trim();
      return (
        movie.nameRU.toLowerCase().indexOf(a) !== -1 ||
        movie.nameEN.toLowerCase().indexOf(a) !== -1
      );
    });
  }

  function setRequestToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function checkFilmsLastRequest() {
    const lastMovies = localStorage.getItem('filmsLastRequest');
    if (lastMovies) {
      setFoundMovies(getLastRequestFromLocalStorage('filmsLastRequest'));
    }
    const lastRequestedKeyword = localStorage.getItem('lastRequest');
    if (lastRequestedKeyword) {
      setSearchRequest(getLastRequestFromLocalStorage('lastRequest'));
    }
    const lastRequestedCheckbox = localStorage.getItem('checkbox');
    if (lastRequestedCheckbox) {
      setIsCheckboxActive(getLastRequestFromLocalStorage('checkbox'));
    }
    return;
  } 

  function getLastRequestFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
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
    } else if ( width > WINDOW_WIDTH_690 && width < WINDOW_WIDTH_1140){
      setMoviesToInitialRender({
        current: MOVIES_12_FILMS,
        next: MOVIES_3_MORE_FILMS,
      })
    }else if (width < WINDOW_WIDTH_690) {
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
        <MoviesList 
          movies={isCheckboxActive ? shotMovies : foundMovies}
          isLoading={isLoading}
          onClick={handleMoreButtonClick}
          limit={moviesToInitialRender.current}
          isSavedMovie={false}
          onSave={onSave}
          onDelete={onDelete}
          savedMovies={savedMovies}
        />
      </main>
      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        title={infoTooltipText}
        onClose={closePopup}
        image={errorImage}
      />
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Main;