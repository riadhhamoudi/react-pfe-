import React from 'react';
import '../navbar/Navbar.css';
 import logo from '../logo/pngegg.png';

 import { CiSettings } from "react-icons/ci";

 import { useLocation } from 'react-router-dom';

 function Navbar() {
   const location = useLocation();
   const isFacturePage = location.pathname === '/Listes_factures_responsable';
   const isDashPage = location.pathname === '/Dashboard_responsable';
   const iscontactPage = location.pathname === '/listes_Réclamtion_responsable';
   const istraitPage = location.pathname === '/traitement_facture';
   const isArchive_resPage = location.pathname === '/Archive_responsable';
 



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
       
       <a href="/Dashboard_responsable" className={isDashPage ? "active" : ""}>Dashboard</a>
       <a href="/traitement_facture" className={istraitPage ? "active" : ""}>Factures À Traiter</a>
       <a href="/Listes_factures_responsable" className={isFacturePage ? "active" : ""}>Facture</a>
       <a href="/listes_Réclamtion_responsable" className={iscontactPage ? "active" : ""}>réclamations</a>
       
       <a href="/Archive_responsable" className={isArchive_resPage ? "active" : ""}>Archives</a>
 
       <div className="dropdown" style={{ position: "fixed", bottom: 0 }}>
       <CiSettings className='ss' style={{ fontSize: '30px' , marginBottom: '10%' }}/>

         <div className="dropdown-content">
           <a href="/information_personnel_responsable">compte</a>
           <a href="/">déconnexion</a>
         </div>
       </div>
     </div>
   );
 }

export default Navbar;