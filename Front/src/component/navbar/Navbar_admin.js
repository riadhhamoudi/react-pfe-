import React from 'react';
import '../navbar/Navbar.css';
 import logo from '../logo/pngegg.png';

 import { CiSettings } from "react-icons/ci";

 import { useLocation } from 'react-router-dom';

 function Navbar() {
   const location = useLocation();
   const isFact_AdminPage = location.pathname === '/Listes_factures_admin';
   const isDashPage = location.pathname === '/Dashboard_admin';
   const iscontactPage = location.pathname === '/listes_Réclamtion_admin';
   const isUser_adminPage = location.pathname === '/Listes_Utilisateurs_admin';
   const isarchive_adminPage = location.pathname === '/Archive_admin';

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
      
       <a href="/Dashboard_admin" className={isDashPage ? "active" : ""}>Dashboard</a>
       <a href="/Listes_factures_admin" className={isFact_AdminPage ? "active" : ""}>Facture</a>
       <a href="/listes_Réclamtion_admin" className={iscontactPage ? "active" : ""}>réclamations</a>
       <a href="/archive_admin" className={isarchive_adminPage ? "active" : ""}>archive</a>
       <a href="/Listes_Utilisateurs_admin" className={isUser_adminPage ? "active" : ""}>utlisateurs</a>
       <div className="dropdown" style={{ position: "fixed", bottom: 0 }}>
       <CiSettings className='ss' style={{ fontSize: '30px' , marginBottom: '10%' }}/>
         <div className="dropdown-content">
          
           <a href="/information_personnel_admin">compte</a>
           <a href="/">déconnexion</a>
         </div>
       </div> 
     </div>
   );
 }

export default Navbar;