import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDeleteForever, MdFileDownload } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import './Archive.css';
import Navbar1 from '../navbar/Navbar_Ag.js';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const Factfournisseur = () => {
  const [factures, setFactures] = useState([]);
  const [displayedFactures, setDisplayedFactures] = useState([]);
  const [search, setSearch] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const navigate = useNavigate();

  useEffect(() => { 
    fetchFactures();
  }, []);

  const fetchFactures = () => {
    axios.get('http://localhost:3000/api/archives')
      .then(response => {
        const reversedData = response.data.reverse(); // Inverser le tableau de données ici
        setFactures(reversedData);
        setDisplayedFactures(reversedData.slice(0, itemsPerPage));
      })
      .catch(error => console.error('Error fetching data:', error));
  }; 
  



  const handleSearchClick = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    const filtered = factures.filter(facture =>
      facture.fournisseur.toLowerCase().includes(value)
    );
    setDisplayedFactures(filtered.slice(0, itemsPerPage));
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette facture ?")) {
      const token = localStorage.getItem('token');
      axios.delete(`http://localhost:3000/api/del_arch/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(() => {
        alert('Facture supprimée avec succès');
        fetchFactures(); // Recharger les factures après la suppression
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la facture:', error);
        alert('Échec de la suppression de la facture');
      });
    }
  };



  const handleDownloadPdf = (facture) => {
    const doc = new jsPDF();
    doc.text(`Facture ID: ${facture.id}`, 14, 15);
    doc.autoTable({
      startY: 25,
      theme: 'grid',
      head: [['ID', 'Fournisseur', 'Dossier', 'Numéro de Facture', 'Date de Facture', 'Appareil', 'Montant', 'Objet', 'Statut']],
      body: [[
        facture.id,
        facture.fournisseur,
        facture.dossier,
        facture.num_fact,
        facture.date_fact,
        facture.device,
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



  
  return (
    <div>
      <Navbar1 />
      <div className="all1">
        <div className='tab'>
          <h1 style={{ padding: "1%", marginLeft: "10%" }}>Archive</h1>
          <div className='barre'>
 
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
                <th>Dossier</th>
                <th>Numéro de Facture</th>
                <th>Date de Facture</th>
                <th>Appareil</th>
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
                  <td>{facture.device}</td>
                  <td>{facture.montant}</td>
                  <td>{facture.objet}</td>
                  <td>{facture.statut}</td>
                  <td>
                    <div className='two_icons'>
                      <MdFileDownload onClick={() => handleDownloadPdf(facture)} className='icon_style' />
                      <MdDeleteForever onClick={() => handleDelete(facture.id)} className='icon_style' />
            

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
