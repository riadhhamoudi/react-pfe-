import React from 'react';
import '../navbar/Navbar.css';
 import logo from '../logo/pngegg.png';

 import { CiSettings } from "react-icons/ci";

 import { useLocation } from 'react-router-dom';

 function Navbar() {
   const location = useLocation();
   const isFact_AdminPage = location.pathname === '/Fact_Admin';
   const isDashPage = location.pathname === '/DashboardAg';
   const iscontactPage = location.pathname === '/Listcontact_admin';
   const isUser_adminPage = location.pathname === '/User_admin';


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
       <a href="/Fact_Admin" className={isFact_AdminPage ? "active" : ""}>Facture</a>
       <a href="/Listcontact_admin" className={iscontactPage ? "active" : ""}>réclamations</a>
       <a href="/User_admin" className={isUser_adminPage ? "active" : ""}>users</a>
       <div className="dropdown" style={{ position: "fixed", bottom: 0 }}>
         <CiSettings />
         <div className="dropdown-content">
           <a href="/Changepass_admin">compte</a>
           <a href="/">déconnexion</a>
         </div>
       </div> 
     </div>
   );
 }

export default Navbar;