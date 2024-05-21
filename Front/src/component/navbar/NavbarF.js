import React from 'react';
import '../navbar/Navbar.css';
 import logo from '../logo/pngegg.png';

 import { CiSettings } from "react-icons/ci";

 import { useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isFacturePage = location.pathname === '/liste_facture_fournisseur';
  const isDashPage = location.pathname === 'Dashboard';
  const iscontactPage = location.pathname === '/ajouter_Réclamation';


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
      <a href="/liste_facture_fournisseur"  className={isFacturePage ? "active" : ""}> factures</a>
      <a href="/ajouter_Réclamation"   className={iscontactPage ? "active" : ""} >réclamation </a>
      <div className="dropdown" style={{ position: "fixed", bottom: 0 }}>
      <CiSettings className='ss' style={{ fontSize: '30px' , marginBottom: '10%' }}/>
         <div className="dropdown-content"> 
           <a href="/information_personnel">compte</a>
           <a href="/">déconnexion</a>
         </div>
      </div> 
    </div>
  )

 



}

export default Navbar;