import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Detailcontact from './detailcontact.js';
import NavbarAg from '../navbar/Navbar_res.js';
import ReactPaginate from 'react-paginate';

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
        console.error('Erreur lors de la récupération des récupérations :', err);
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



  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reclamations.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
 

  return (
    <div>
      <NavbarAg/>
      <h2>List de Réclamation</h2>
      {isLoading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>Erreur: {error}</p>
      ) : (
        <>
          <Detailcontact feedbacks={currentItems} />
          <div className="pagination">
          <ReactPaginate
            previousLabel={'Précédent'}
            nextLabel={'Suivant'}
            breakLabel={'...'}
            pageCount={Math.ceil(reclamations.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            forcePage={currentPage}
          />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
