import React from 'react';
import '../navbar/Navbar.css';



function Navbar() {
  return (
    <div className="navbar">
      <a href="/formulaire">Dashboard</a>
      <a href="#bordereaux">Borderaux</a>
      <a href="/formulaire">factures</a>
      <a href="#consultation">consulatation</a>
      
      <a href="#paramétre" className='para'>paramétre</a>
     
    </div>
  )





}

export default Navbar;