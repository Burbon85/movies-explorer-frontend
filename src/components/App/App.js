import React, { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Landing from '../Landing/Landing';
import Main from '../Main/Main';
import moviesApi from '../../utils/MoviesApi';
import Saved from '../Saved/Saved';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesApi.getAllMovies().then((movies) => {
      setMovies(movies);
      console.log(movies);
    });
  }, []);

  return (
    <div className='app' >
      <Routes>
        <Route path='/signin' element={<Login />}></Route>
        <Route path='/signup' element={<Register />}></Route>
        <Route path='/' element={<Landing />}></Route>
        <Route
          path='/movies'
          // element={<Main />}
          element={<Main movies={movies} isOwner={false} />}
        ></Route>
        <Route
          path='/saved-movies'
          element={<Saved movies={movies} isOwner={true} />}
        ></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
