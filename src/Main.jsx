import React from 'react'
import './App.css';
import './Svg';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Skills from './Skills';
import Works from './Works';
import Contact from './Contact';

function Main() {
    return (
        <div id="all" className="all">
        <div id="home" name="home" />
          <Navbar />
          <Home className="h-screen" />
          <div id="about" name="about" />
          <About className="h-screen" />
          <div id="skills" name="skills" />
          <Skills />
          <div id="works" name="works" />
          <Works />
          <div id="contact" name="contact" />
          <Contact />
      </div>
    )
}
    
export default Main