import React,{ useState, useEffect } from 'react';
import './Main.css';
import HeaderMain from '../HeaderMain/HeaderMain';
import Search from '../Search/Search';
import Footer from '../Footer/Footer';
import MoviesList from '../MoviesList/MoviesList';

function Main({ movies, isOwner }) {
  return (
    <>
      <header className='main-header'>
        <HeaderMain />
      </header>
      <main className='movies-main'> 
        <Search />
        <MoviesList movies={movies} isOwner={isOwner}/>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Main;