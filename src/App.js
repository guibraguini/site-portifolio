import './App.css';
import './Svg'
import Svg from './Svg';
import React, { Component }  from 'react';
import Navbar from './Navbar';
import Home from './Home'
import About from './About'
import Skills from './Skills';
import Works from './Works';
import Contact from './Contact';
import Tokens from './Tokens';
import NFTS from './NFTS';
import Exchange from './Exchange';
import Voting from './Voting'
import Main from './Main';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';


function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route exact path='/' element={< Main />}/>
        <Route exact path='/tokens' element={< TokensPage />}/>
        <Route exact path='/nfts' element={< NFTSPage />}/>
        <Route exact path='/exchange' element={< ExchangePage />}/>
        <Route exact path='/voting' element={< VotingPage />}/>
      </Routes>
    </Router>
    </div>
  );
}

const TokensPage = () => (

  <Tokens />

);

const NFTSPage = () => (

  <NFTS />

);

const ExchangePage = () => (

  <Exchange />

);

const VotingPage = () => (

  <Voting />

);

export default App;
