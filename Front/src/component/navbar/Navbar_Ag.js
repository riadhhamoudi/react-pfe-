import React from 'react';
import '../navbar/Navbar.css';
 import logo from '../logo/pngegg.png';

 import { CiSettings } from "react-icons/ci";

 import { useLocation } from 'react-router-dom';

 function Navbar() {
   const location = useLocation();
   const isFacturePage = location.pathname === '/liste_facture_Agent';
   const isDashPage = location.pathname === '/DashboardAg';
   const iscontactPage = location.pathname === '/listes_Réclamtion';
   const isUserPage = location.pathname === '/Listes_Utilisateurs_agent';


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
       <a href="/liste_facture_Agent" className={isFacturePage ? "active" : ""}>Facture</a>
       <a href="/listes_Réclamtion" className={iscontactPage ? "active" : ""}>réclamations</a>
       <a href="/Archive_agent" className={iscontactPage ? "active" : ""}>Archives</a>
       <a href="/Listes_Utilisateurs_agent" className={isUserPage ? "active" : ""}>utlisateurs</a>
       <div className="dropdown" style={{ position: "fixed", bottom: 0 }}>
       <CiSettings className='ss' style={{ fontSize: '30px' , marginBottom: '10%' }}/>
         <div className="dropdown-content">
           <a href="/information_personnel_agent">compte</a>
           <a href="/">déconnexion</a>
         </div>
       </div>
     </div>
   );
 }

export default Navbar;