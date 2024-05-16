import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDeleteForever, MdAdd, MdFileDownload, MdArchive } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import './Fact_fournisseur.css';
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
    axios.get('http://localhost:3000/api/factures')
      .then(response => {
        const reversedData = response.data.reverse(); // Reverse data array here
        setFactures(reversedData);
        setDisplayedFactures(reversedData.slice(0, itemsPerPage));
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleAjoutClick = () => {
    navigate('/formulaireAg');
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
        fetchFactures(); // Refresh factures after deletion
      })
      .catch(error => {
        console.error('Error deleting facture:', error);
        alert('Failed to delete facture');
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/editfact_Ag/${id}`);
  };

  const handleDownloadPdf = (facture) => {
    const doc = new jsPDF();
    doc.text(`Facture ID: ${facture.id}`, 14, 15);
    doc.autoTable({
      startY: 25,
      theme: 'grid',
      head: [['Référence', 'Fournisseur	', 'direction', 'Numéro de facture', 'Date de Facture','pathPDF', 'Montant', 'Objet', 'Statut']],
      body: [
        [
          facture.id,
          facture.fournisseur,
          facture.dossier,
          facture.num_fact,
          facture.date_fact,
          facture.device,
          `${facture.montant} TND`,
          facture.objet,
          facture.statut
        ],
      ],
    });
    doc.save(`Facture_${facture.id}.pdf`);
  };

  const handleArchive = (id) => {
    const token = localStorage.getItem('token');
    axios.post(`http://localhost:3000/api/facture/archive/${id}`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(() => {
      alert('Facture archived successfully');
      fetchFactures(); // Refresh factures after archiving
    })
    .catch(error => {
      console.error('Error archiving facture:', error);
      alert('Failed to archive facture');
    });
  };

  // Function to determine the color based on the status
  const getStatusColor = (statut) => {
    if (statut === 'en cours') return 'green';
    else if (statut === 'réfusé') return 'red';
    else return 'blue';
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
                      <MdArchive onClick={() => handleArchive(facture.id)} className='icon_style' />

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