import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDeleteForever, MdAdd, MdFileDownload } from "react-icons/md";
import { FcAcceptDatabase } from "react-icons/fc";
import { AiOutlineSearch } from "react-icons/ai";
import './Trait.css';
import Navbar1 from '../navbar/Navbar_res.js';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Factfournisseur = () => {
  const [factures, setFactures] = useState([]);
  const [displayedFactures, setDisplayedFactures] = useState([]);
  const [search, setSearch] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Note: react-paginate uses zero index for initial page
  const [itemsPerPage] = useState(8);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFactures();
  }, []);

  const fetchFactures = () => {
    axios.get('http://localhost:3000/api/factures_res')
      .then(response => {
        const reversedData = response.data.reverse();
        setFactures(reversedData);
        setDisplayedFactures(reversedData.slice(0, itemsPerPage));
      })
      .catch(error => console.error('Erreur lors de la récupération des données :', error));
  };

  const handleAjoutClick = () => {
    navigate('/Formulaire_responsable');
  };

  const handleSearchClick = () => {
    setIsInputVisible(true);
  };

  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    const filtered = factures.filter(facture =>
      facture.fournisseur.toLowerCase().includes(value)
    );
    setDisplayedFactures(filtered.slice(0, itemsPerPage));
    setCurrentPage(0);
  };

  const handleDownloadPdf = (facture) => {
    const doc = new jsPDF();
    doc.text(`ID de la Facture : ${facture.id}`, 14, 15);
    doc.autoTable({
      startY: 20,
      theme: 'grid',
      head: [['Référence', 'Fournisseur', 'Direction', 'Numéro de Facture', 'Date de Facture', 'Chemin PDF', 'Montant', 'Objet', 'Statut']],
      body: [[
        facture.id,
        facture.fournisseur,
        facture.dossier,
        facture.num_fact,
        facture.date_fact,
        facture.pathpdf,
        `${facture.montant} TND`,
        facture.objet,
        facture.statut
      ]],
    });
    doc.save(`Facture_${facture.id}.pdf`);
  };

  const handlePageClick = (event) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
    const indexOfLastItem = (newPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setDisplayedFactures(factures.slice(indexOfFirstItem, indexOfLastItem));
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirmation de refus du facture',
      message: 'Êtes-vous sûr de vouloir refusée cette facture ?',
      buttons: [
        {
          label: 'Oui',
          onClick: () => deleteFacture(id)
        },
        {
          label: 'Non',
          onClick: () => {}
        }
      ]
    });
  };
  
  const deleteFacture = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3000/api/del_fact_res/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(() => {
      alert('Facture réfusée');
      fetchFactures(); // Refresh the factures list after deletion
    })
    .catch(error => {
      console.error('Erreur lors de la refus du facture :', error);
      alert('Échec de la refus de la facture');
    });
  };
  

  const acceptFacture = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir accepter cette facture ?")) {
      const token = localStorage.getItem('token');
      axios.post(`http://localhost:3000/api/facture/accept/${id}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(() => {
        alert('Facture acceptée avec succès');
        fetchFactures(); // Rafraîchir les factures après acceptation
      })
      .catch(error => {
        console.error('Échec de lacceptation de la facture :', error);
        alert('Échec de lacceptation de la facture');
      });
    }
  };
 // Function to determine the color based on the status
 const getStatusColor = (statut) => {
  if (statut === 'en cours') return 'green';
  else if (statut === 'réfusé') return 'red';
  else return 'blue';
};
  return (
    <div>
      <Navbar1 />
      <div className="all1">
        <div className='tab'>
          <h1 style={{ padding: "1%", marginLeft: "10%" }}>Liste des Factures Non Traitées</h1>
          <div className='barre'>
            <div className='add_inv' onClick={handleAjoutClick}>
              <MdAdd /> Ajouter une facture 
            </div>
            <div className='add_inv' onClick={handleSearchClick}>
              <AiOutlineSearch />
              <label>Rechercher une facture</label>
              {isInputVisible && (
                <input
                  type="text"
                  value={search}
                  onChange={handleInputChange}
                  className='search_inv'
                  placeholder='Rechercher par fournisseur'
                />
              )}
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Référence</th>
                <th>Fournisseur</th>
                <th>Direction</th>
                <th>Numéro de Facture</th>
                <th>Date de Facture</th>
                <th>PDF de la Facture</th>
                <th>Devise</th>
                <th>Montant</th>
                <th>Objet</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedFactures.map((facture, index) => (
                <tr key={index}>
                  <td>{facture.id}</td>
                  <td>{facture.fournisseur}</td>
                  <td>{facture.dossier}</td>
                  <td>{facture.num_fact}</td>
                  <td>{facture.date_fact}</td>
                  <td>{facture.pathpdf}</td>
                  <td>{facture.device}</td>
                  <td>{facture.montant}</td>
                  <td>{facture.objet}</td>
                  <td style={{ color: getStatusColor(facture.statut) }}>{facture.statut}</td>
                  <td>
                    <div className='two_icons'>
                      <MdFileDownload onClick={() => handleDownloadPdf(facture)} className='icon_style' />
                      <MdDeleteForever onClick={() => handleDelete(facture.id)} className='icon_style' />
                      <FcAcceptDatabase onClick={() => acceptFacture(facture.id)} className='icon_style' />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <ReactPaginate
              previousLabel={"Précédent"}
              nextLabel={"Suivant"}
              breakLabel={"..."}
              pageCount={Math.ceil(factures.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"paginationButtons"}
              previousLinkClassName={"previousButton"}
              nextLinkClassName={"nextButton"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factfournisseur;
