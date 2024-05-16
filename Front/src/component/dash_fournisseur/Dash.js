import '../dash_fournisseur/Dash.css'; // Import your CSS file
import React, { useEffect } from 'react';

import Chart from 'chart.js/auto'; // Import Chart.js library



const FinancialStatisticsDashboard = () => {
  useEffect(() => {
    // Sample data for charts
    const salesByCountryData = {
      labels: ["USA", "Canada", "UK", "Bangladesh"],
      datasets: [{
        label: "Sales Volume",
        data: [250000, 180000, 160000, 120000],
        backgroundColor: ["#007BFF", "#28A745", "#FFC107", "#DC3545"],
      }]
    };

    const topSellingProductsData = {
      labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
      datasets: [{
        label: "Sales",
        data: [3500, 2800, 2200, 1900, 1500],
        backgroundColor: ["#007BFF", "#28A745", "#FFC107", "#DC3545", "#FF5733"],
      }]
    };

    const salesByExecutivesData = {
      labels: ["Sales Exec 1", "Sales Exec 2", "Sales Exec 3"],
      datasets: [{
        data: [250000, 180000, 160000],
        backgroundColor: ["#007BFF", "#28A745", "#FFC107"],
      }]
    };

    const salesIncrementData = {
      labels: ["Sales Increment"],
      datasets: [{
        data: [25], // Adjust this value for the percentage you want to display
        backgroundColor: ["#007BFF"],
      }]
    };

    // Initialize charts
    const salesByCountryChart = new Chart(document.getElementById("salesByCountryChart"), {
      type: "bar",
      data: salesByCountryData,
    });

   
    const topSellingProductsChart = new Chart(document.getElementById("topSellingProductsChart"), {
      type: "horizontalBar",
      data: topSellingProductsData,
    });

    const salesByExecutivesChart = new Chart(document.getElementById("salesByExecutivesChart"), {
      type: "pie",
      data: salesByExecutivesData,
    });

    const salesIncrementChart = new Chart(document.getElementById("salesIncrementChart"), {
      type: "pie",
      data: salesIncrementData,
    });

    // Cleanup function
    return () => {
      salesByCountryChart.destroy();
      topSellingProductsChart.destroy();
      salesByExecutivesChart.destroy();
      salesIncrementChart.destroy();
    };
  }, []); // Run once on component mount

  return (
    <div>
      {/* Your HTML structure */}
      <div className="sidebar">
        <h2>Rana</h2>
        <p>Admin</p>
        <a href="#."><i className="fas fa-sign-out-alt"></i> Logout</a>
      </div>
      <div className="top-bar">
        <h2>Ron Tech Inc. | Financial Statistics Dashboard</h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <i className="fas fa-chart-line"></i>
              <h2>Revenue</h2>
              <p>$1,000,000</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <i className="fas fa-dollar-sign"></i>
              <h2>Profit</h2>
              <p>$500,000</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <i className="fas fa-users"></i>
              <h2>Customers</h2>
              <p>10,000</p>
            </div>
          </div>
        </div>

        <div className="row chart-container">
          <div className="col-md-6">
            <canvas id="salesByCountryChart"></canvas>
          </div>
          <div className="col-md-6">
            <canvas id="topSellingProductsChart"></canvas>
          </div>
        </div>

        <div className="row chart-container">
          <div className="col-md-6">
            <canvas id="salesByExecutivesChart"></canvas>
          </div>
          <div className="col-md-6">
            <canvas id="salesIncrementChart"></canvas>
          </div>
        </div>
      </div>

      <button className="print-button" onClick={() => window.print()}><i className="fas fa-print"></i> Print</button>
    </div>
  );
};

export default FinancialStatisticsDashboard;
