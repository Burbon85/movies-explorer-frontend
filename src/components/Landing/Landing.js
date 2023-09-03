import React from 'react';
import './Landing.css';
import Header from '../Header/Header';
import Cover from '../Cover/Cover';
import Project from '../Project/Project';
import Technology from '../Technology/Technology';
import Student from '../Student/Student';
import Footer from '../Footer/Footer';

function Landing() {
  return (
    <>
      <header className='landing__header'>
        <Header />
        <Cover />
      </header>
      <main>
        <Project />
        <Technology />
        <Student />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Landing;