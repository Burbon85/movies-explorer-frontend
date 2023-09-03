import React from 'react';
import './Saved.css';
import HeaderMain from '../HeaderMain/HeaderMain';
import Search from '../Search/Search';
import Footer from '../Footer/Footer';
import MoviesList from '../MoviesList/MoviesList';

function Saved({ movies, isOwner }) {
  return (
    <>
    <header className='main__header'>
      <HeaderMain />
    </header>
    <main className='movies-main'> 
      <Search />
      <MoviesList movies={movies.slice(0, 3)} isOwner={isOwner}/> 
      <div className='movies-main__block'></div>    
    </main>
    <footer>
      <Footer />
    </footer>
  </>
  )
}

export default Saved;