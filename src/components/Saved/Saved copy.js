import React,{ useState, useEffect } from 'react';
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

function Saved({ initialMovies, onSave, onDelete, savedMovies, movies, keyword }) {
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
    setFoundMovies(initialMovies);
  }, [])

  // useEffect(() => {
  //   setSearchRequest();
  // }, [])

  // useEffect(() => {
  //   searchMoviesHandler();
  // }, [searchRequest, isCheckboxActive]);

  // function handleFilter(movies) {
  //   return movies.filter((movie) => {
  //     return movie.duration <= SHORT_FILMS;
  //   });
  // }

  // function filterShotMovies(foundMovies) {
  //   setShotMovies(handleFilter(foundMovies));
  // }

  // useEffect(() => {
  //   filterShotMovies(initialMovies);
  // }, [foundMovies, searchRequest]);
  
  useEffect(() => {
    resize()
  }, [width]);

  
  async function searchMoviesHandler(movies, keyword) {
    setIsLoading(true);
    setFoundMovies([]);
    // setIsCheckboxActive();
    try {
      if(searchRequest.length > 0) {
        const moviesToRender = await handleSearch( { movies, savedMovies, keyword, isCheckboxActive });
        if(moviesToRender.length === 0) {
          setInfoTooltipText('Не найдено');
          // setInfoTooltipPopupOpen(true);
        } else {
          setFoundMovies(moviesToRender);
        }
      }
      return
    } catch(err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  const handleSearch = ({ movies, savedMovies, keyword, isCheckboxActive }) => {
    const filterMovies = [];
  
    keyword = keyword.toLowerCase().trim().replace(/^\s+|\s+$|\s+(?=\s)/g, "");
  
    movies.forEach((movie) => {
      if ((movie.nameRU.toLowerCase().includes(keyword) || movie.nameEN.toLowerCase().includes(keyword)) && (isCheckboxActive ? movie.duration <= SHORT_FILMS : true)) {
        const savedMovie = savedMovies.find((savedMovie) => savedMovie.movieId === movie.movieId);
        if (savedMovie) {
          movie.liked = savedMovie._id;
        }
  
        filterMovies.push(movie);
      }
    })
  
    return filterMovies;
  }

  // const handleSearchSavedMovies = handleSearch({ initialMovies: foundMovies, savedMovies: [], keyword, checked });

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
        handleSearch={searchMoviesHandler}
        handleCheckboxClick={handleCheckboxClick}
        searchRequest={searchRequest}
        checkbox={isCheckboxActive}
      />
      {isLoading ? (
        <Preloader />
          ) : ( <MoviesList 
            movies={getMoviesList()} 
            // movies={!searchRequest ? isCheckboxActive ? shotMovies : initialMovies : isCheckboxActive ? shotMovies : foundMovies}
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