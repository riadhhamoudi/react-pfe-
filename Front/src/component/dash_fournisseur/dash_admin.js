import React, { useEffect, useRef } from 'react';
import './Dash.css';
import Navbar1 from '../navbar/Navbar_admin';


function Dashboard() {
 
  return (
    <div className="App">
      <header className="App-header">
        <Navbar1 />
        <div className='dash'>
        <iframe title="dash" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=f2473d06-86cf-43c6-bbc4-24b5f9d39f02&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730" frameborder="0" allowFullScreen="true"></iframe>
            </div>
            </header>
            </div>
  );
}

export default Dashboard;
