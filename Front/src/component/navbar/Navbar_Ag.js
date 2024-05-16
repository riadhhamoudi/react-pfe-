import React from 'react';
import '../navbar/Navbar.css';
 import logo from '../logo/pngegg.png';

 import { CiSettings } from "react-icons/ci";

 import { useLocation } from 'react-router-dom';

 function Navbar() {
   const location = useLocation();
   const isFacturePage = location.pathname === '/liste_factureAg';
   const isDashPage = location.pathname === '/DashboardAg';
   const iscontactPage = location.pathname === '/List_contact';
   const isUserPage = location.pathname === '/User';


   return ( 
     <div className="navbar">
       <img
         className="logo"
         loading="lazy"
         src={logo}
         width="80%" 
         height="10%"
         alt="Logo Tunisie Telecom"
         style={{ marginBottom: "30%", marginTop: "0%" }}
       />
       <a href="/DashboardAg" className={isDashPage ? "active" : ""}>Dashboard</a>
       <a href="/liste_factureAg" className={isFacturePage ? "active" : ""}>Facture</a>
       <a href="/List_contact" className={iscontactPage ? "active" : ""}>réclamations</a>
       <a href="/Archive" className={iscontactPage ? "active" : ""}>Archives</a>
       <a href="/User" className={isUserPage ? "active" : ""}>users</a>
       <div className="dropdown" style={{ position: "fixed", bottom: 0 }}>
         <CiSettings />
         <div className="dropdown-content">
           <a href="/changepassAg">compte</a>
           <a href="/">déconnexion</a>
         </div>
       </div>
     </div>
   );
 }

export default Navbar;