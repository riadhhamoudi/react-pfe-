import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Detailcontact from './detailcontact.js';
import NavbarAg from '../navbar/Navbar_admin.js';
import ReactPaginate from 'react-paginate';

const AdminDashboard = () => {
  const [reclamations, setReclamations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Pagination commence à 0 pour ReactPaginate
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
        console.error('Erreur lors de la récupération des réclamations :', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReclamations();
  }, []);

  // Calculer les réclamations à afficher
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reclamations.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div>
      <NavbarAg />
      <h2>Liste de Réclamations</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <Detailcontact feedbacks={currentItems} />
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
        </> 
      )}
    </div>
  );
};

export default AdminDashboard;
