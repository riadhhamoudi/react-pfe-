import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Detailcontact from './detailcontact.js';
import NavbarAg from '../navbar/Navbar_Ag.js';

const AdminDashboard = () => {
  const [reclamations, setReclamations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reclamations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setReclamations(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching reclamations:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReclamations();
  }, []);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reclamations.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reclamations.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <button 
        key={number} 
        id={number}
        onClick={handleClick}
        className={currentPage === number ? 'active' : ''}
      >
        {number}
      </button>
    );
  });

  return (
    <div>
      <NavbarAg/>
      <h2>List de Réclamation</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <Detailcontact feedbacks={currentItems} />
          <div className="pagination">
            {renderPageNumbers}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
