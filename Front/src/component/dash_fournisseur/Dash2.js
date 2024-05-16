import React from 'react';
import './Dash.css';
import Navbar1 from '../navbar/Navbar_Ag';




function Dashboard() {
  return (
    <div>
      <Navbar1/>
    <div className="dashboard">
      <div className="stats-cards">
        <div className="card card-green">
          <div className="card-content">
            <span>Potential Growth</span>
            <h1>$12.34</h1>
            <span>+3.5%</span>
          </div>
        </div>
        <div className="card card-blue">
          <div className="card-content">
            <span>Revenue Current</span>
            <h1>$17.34</h1>
            <span>+11%</span>
          </div>
        </div>
        <div className="card card-red">
          <div className="card-content">
            <span>Daily Income</span>
            <h1>$12.34</h1>
            <span>-2.4%</span>
          </div>
        </div>
        <div className="card card-green">
          <div className="card-content">
            <span>Expense Current</span>
            <h1>$31.53</h1>
            <span>+3.5%</span>
          </div>
        </div>
      </div>
      <div className="lower-section">
        <div className="transaction-history">
          <h2>Transaction History</h2>
          <div className="history-chart"></div>
          <div className="history-list">
            <div className="history-item">
              <p>Transfer to Paypal</p>
              <span>$236</span>
            </div>
            <div className="history-item">
              <p>Transfer to Stripe</p>
              <span>$593</span>
            </div>
          </div>
        </div>
        <div className="projects">
          <h2>Open Projects</h2>
          <div className="project-list">
            <div className="project-item">Admin dashboard design</div>
            <div className="project-item">Wordpress Development</div>
            <div className="project-item">UI Design</div>
          </div>
        </div>
      </div>
    </div>
    
    </div>
  );
}

export default Dashboard;
