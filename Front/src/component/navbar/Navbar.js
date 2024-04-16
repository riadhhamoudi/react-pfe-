
// Navbar.js
import React, { useState } from 'react';
import '../navbar/Navbar.css';
import logo from '../logo/logo.png';


const Navbar = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isBourdeauxVisible, setBourdeauxVisible] = useState(true);
  const [isFactursVisible, setFactursVisible] = useState(true);
  const [isConsultationVisible, setConsultationVisible] = useState(true);
   const [isLoggedIn, setIsLoggedIn] = useState(true); 

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const toggleBourdeaux = () => {
    setBourdeauxVisible(!isBourdeauxVisible);
  };

  const toggleFacturs = () => {
    setFactursVisible(!isFactursVisible);
  };

  const toggleConsultation = () => {
    setConsultationVisible(!isConsultationVisible);
  };

  const toggleLoggedIn = () => {
    setConsultationVisible(!isConsultationVisible);
  };

  return (
    <div className="navbar">
      <div className="mobile-menu" onClick={toggleMenu}>
        
      <img
          className="logo"
          loading="lazy"
          src={logo} // Use the imported image variable here
          width="150px"
          alt="Logo Tunisie Telecom"
        />




         <h2>Direction Contrale des Finances des factures</h2>
        <i className={`fa ${isMenuVisible ? 'fa-times' : 'fa-bars'} fa-3x js-menu-icon`}></i>
      </div>
      <nav className={`navbar js-navbar ${isMenuVisible ? 'navbar--is-visible' : ''}`}>
        <ul className="menu">
          <li>
            <a href="#">DASHBOARD</a>
          </li>
          <li>
            <a href="#" onClick={toggleBourdeaux}>BOURDEAUX</a>
            {isBourdeauxVisible && (
              <ul className="dropdown">
                <li><a href="#">Bourdeaux Item 1</a></li>
               
                <li><a href="#">Bourdeaux Item 2</a></li>
                <li><a href="#">Bourdeaux Item 3</a></li>
              </ul>
            )}
          </li>
          <li>
            <a href="#" onClick={toggleFacturs}>FACTURS</a>
            {isFactursVisible && (
              <ul className="dropdown">
                <li><a href="#">Facturs Item 1</a></li>
                <li><a href="#">Facturs Item 2</a></li>
                <li><a href="#">Facturs Item 3</a></li>
              </ul>
            )}
          </li>
          <li>
            <a href="#" onClick={toggleConsultation}>CONSULTATION</a>
            {isConsultationVisible && (
              <ul className="dropdown">
                <li><a href="#">Consultation Item 1</a></li>
                <li><a href="#">Consultation Item 2</a></li>
                <li><a href="#">Consultation Item 3</a></li>
              </ul>
            )}
          </li>
          <li>
          <ul>
          <img src="profile.jpg" alt="photo de profile" className="profile-photo" />
          </ul>
          </li>
          <li>
        
            <a href="#" onClick={toggleLoggedIn}>Your Name</a>
            {isConsultationVisible && (
              <ul className="dropdown">
                <li><a href="#">Paramétre du compte</a></li>
                <li><a href="#">Déconnexion</a></li>
              </ul>
            )}
          </li>
        </ul>
       
      </nav>
    </div>
  );
};
export default Navbar;