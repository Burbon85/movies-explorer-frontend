import React, { useState, useEffect, useCallback }  from 'react';

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Landing from '../Landing/Landing';
import Main from '../Main/Main';
import moviesApi from '../../utils/MoviesApi';
import Saved from '../Saved/Saved';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import auth from '../../utils/AuthApi';
import moviesMapApi from '../../utils/moviesMapApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../Infotooltip/InfoTooltip';
import okImg from '../../images/ok.svg';
import errImg from '../../images/err.svg';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('loggedIn') || false
  );
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [registered, setRegistered] = useState(false);
  const [infoTooltipText, setInfoTooltipText] = useState('');
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [userData, setUserData] = useState({
    password: '',
    email: '',
    name: '',
  });
  const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   moviesApi.getAllMovies().then((movies) => {
  //     setMovies(movies);
  //     console.log(movies);
  //   });
  // }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getContent(jwt)
        .then((response) => {
          setLoggedIn(true);
          setCurrentUser({
            email: response.email,
            name: response.name,
          });
        })
        .catch((e) => console.log(e));
    }
  }, [navigate]);

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    mainApi.setToken();
    if (loggedIn) {
      mainApi
        .getAllNeededData()
        .then(([userInfo, savedUserMovies]) => {
          setCurrentUser(userInfo);
          setSavedMovies(savedUserMovies);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    setErrorMessage('');
    }, [errorMessage, navigate]);
    
    const resetErrorMessage = useCallback((clearErrorMessage='') => {
      setErrorMessage(clearErrorMessage)
    }, [setErrorMessage])
  
    useEffect(() => {
      resetErrorMessage();
    }, [resetErrorMessage, navigate]);
//
  function handleRegisterUser({ email, password, name }) {
    setIsLoading(true);
    auth
      .register({ email, password, name })
      .then(() => {
        handleLoginUser({ email, password });
      })
      .catch((e) => {
        setRegistered(false);
        setInfoTooltipText('Пользователь с таким e-mail уже существует!');
        setInfoTooltipPopupOpen(true);
        setErrorMessage(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  //
  function handleLoginUser({ email, password }) {
    setIsLoading(true);
    auth
      .authorize({ email, password })
      .then((response) => {
        localStorage.setItem('jwt', response.token);
        setLoggedIn(true);
        setCurrentUser({
          email: response.email,
          name: response.name,
        });
        localStorage.setItem('loggedIn', true);
        navigate('/movies');
      })
      .catch((e) => {
        setRegistered(false);
        setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз!');
        setInfoTooltipPopupOpen(true);
        setErrorMessage(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
//
  function handleUpdateUserInfo({ email, name }) {
    setIsLoading(true);
    mainApi
      .patchUserInfo({ email, name })
      .then(() => {
        setCurrentUser({ email, name });
        setErrorMessage('Данные успешно обновлены!');
        setInfoTooltipText('Данные успешно обновлены!');
        setInfoTooltipPopupOpen(true);
        setRegistered(true);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setRegistered(false);
        setInfoTooltipText('Пользователь с таким e-mail уже существует!');
        setInfoTooltipPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('lastRequest');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('moviesLastRequest');
    localStorage.removeItem('allMovies');
    setLoggedIn(false);
    setCurrentUser({});
    navigate('/');
  }

  function handleGetAllMovies() {
    setIsLoading(true);
    moviesApi
      .getAllMovies()
      .then((InitialMovies) => {
        const transformedmovies = moviesMapApi(InitialMovies);
        localStorage.setItem('allMovies', JSON.stringify(transformedmovies));
        setInitialMovies(transformedmovies);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getLocalStorage() {
    const allMovies = localStorage.getItem('allMovies');
    if (allMovies) {
      setInitialMovies(JSON.parse(allMovies));
    } else {
      handleGetAllMovies();
    }
  }

  function handleSaveMovie(movie) {
    setIsLoading(true);
    mainApi
      .postNewMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleDeleteMovie(_id) {
    setIsLoading(true);
    mainApi
      .deleteMovie(_id)
      .then(() => {
        const restSavedMovies = savedMovies.filter(
          (movie) => movie._id !== _id
        );
        setSavedMovies(restSavedMovies);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closePopup() {
    setInfoTooltipPopupOpen(false);
  }

  return (
    <div className='app' >
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          {!loggedIn ? (
            <Route path='/signin' element={<Login 
              onLoginUserData={handleLoginUser}
              isLoading={isLoading}
              errorMessage={errorMessage}/>}></Route>) : (
              <Route path='/signin' element={<Navigate to='/' />} />
          )}
          {!loggedIn ? (
            <Route path='/signup' element={<Register 
              onRegisterUserData={handleRegisterUser}
              isLoading={isLoading}
              errorMessage={errorMessage} />}></Route> ) : (
            <Route path='/signup' element={<Navigate to='/' />} />
          )}
          <Route path='/' element={<Landing />}></Route>
          <Route
            path='/movies'
            // element={<Main />}
            // element={<Main movies={movies} isOwner={false} />}
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Main}
                initialMovies={initialMovies}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
                savedMovies={savedMovies}
                signOut={handleSignOut}
              />
            }
          ></Route>
          <Route
            path='/saved-movies'
            element={<ProtectedRoute
              loggedIn={loggedIn}
              component={Saved}
              initialMovies={savedMovies}
              onSave={handleSaveMovie}
              onDelete={handleDeleteMovie}
              savedMovies={savedMovies}
            />}
          ></Route>
          {/* {loggedIn ? ( <Route path='/profile' element={<Profile />}></Route> ) : (
            <Route path='/profile' element={<Navigate to='/' />} />
          )} */}
          <Route path='/profile' element={
            <Profile 
              loggedIn={loggedIn}
              onUpdateUserInfo={handleUpdateUserInfo}
              signOut={handleSignOut}
              isLoading={isLoading}
            />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          title={infoTooltipText}
          onClose={closePopup}
          image={registered ? okImg : errImg}
        />
      </CurrentUserContext.Provider>      
    </div>
  );
}

export default App;
