import React from 'react';
import '../navbar/Navbar.css';
 import logo from '../logo/pngegg.png';

 import { CiSettings } from "react-icons/ci";

 import { useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isFacturePage = location.pathname === '/liste_facture';
  const isDashPage = location.pathname === 'Dashboard';
  const iscontactPage = location.pathname === '/contact';


  return (
   <div className="navbar">
            <img 
     className="logo"
      loading="lazy"
       src={logo} // Use the imported image variable here
        width="80%"
        height="10%"
          alt="Logo Tunisie Telecom"
          style={{ marginBottom:"30%",marginTop:"0%" }}
       />  
      <a href="/Dashboard" className={isDashPage ? "active" : ""}>Dashboard</a>
      <a href="/liste_facture"  className={isFacturePage ? "active" : ""}> factures</a>
      <a href="/contact"   className={iscontactPage ? "active" : ""} >réclamation </a>
      <div className="dropdown" style={{ position: "fixed", bottom: 0 }}>
         <CiSettings />
         <div className="dropdown-content"> 
           <a href="/changepassAg">compte</a>
           <a href="/">déconnexion</a>
         </div>
      </div> 
    </div>
  )

 



}

export default Navbar;