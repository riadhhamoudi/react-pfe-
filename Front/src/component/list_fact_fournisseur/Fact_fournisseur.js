import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDeleteForever, MdAdd, MdFileDownload } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import './Fact_fournisseur.css';
import Navbar1 from '../navbar/NavbarF.js';
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const Factfournisseur = () => {
  const [factures, setFactures] = useState([]);
  const [displayedFactures, setDisplayedFactures] = useState([]);
  const [search, setSearch] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFactures();
  }, []);

  const fetchFactures = () => {
    axios.get('http://localhost:3000/api/factures')
      .then(response => {
        const reversedData = response.data.reverse();
        setFactures(reversedData);
        setDisplayedFactures(reversedData.slice(0, itemsPerPage));
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleAjoutClick = () => {
    navigate('/formulaire');
  };

  const handleSearchClick = () => {
    setIsInputVisible(true);
  };
  
  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    const filtered = factures.filter(facture =>
      facture.fournisseur.toLowerCase().includes(value)
    ).reverse();
    setDisplayedFactures(filtered.slice(0, itemsPerPage));
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette facture ?")) {
      const token = localStorage.getItem('token');
      axios.delete(`http://localhost:3000/api/del_fact/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(() => {
        alert('Facture supprimée avec succès');
        fetchFactures();
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la facture:', error);
        alert('Échec de la suppression de la facture');
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/editfact_F/${id}`);
  };

  const handleDownloadPdf = (facture) => {
    const doc = new jsPDF();
    doc.text(`Facture ID: ${facture.id}`, 14, 15);
    doc.autoTable({
      startY: 20,
      theme: 'grid',
      head: [['Référence', 'Fournisseur	', 'direction', 'Numéro de facture', 'Date de Facture','pathPDF', 'Montant', 'Objet', 'Statut']],
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

  const handlePageClick = (number) => {
    setCurrentPage(number);
    const indexOfLastItem = number * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setDisplayedFactures(factures.slice(indexOfFirstItem, indexOfLastItem));
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
          <h1 style={{ padding: "1%", marginLeft: "10%" }}>Liste des Factures</h1>
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
                <th>direction</th>
                <th>Numéro de facture</th>
                <th>Date de facture</th>
                <th>PDF de facture</th>
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
                      <RiFileEditFill onClick={() => handleEdit(facture.id)} className='icon_style' />
                     

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: Math.ceil(factures.length / itemsPerPage) }, (_, i) => i + 1)
              .map(number => (
                <button
                  key={number}
                  onClick={() => handlePageClick(number)}
                  style={{ margin: 5, cursor: 'pointer' }}
                >
                  {number}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factfournisseur;

