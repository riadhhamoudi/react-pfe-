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
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


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
    navigate('/formulaire_agent');
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
    confirmAlert({
      title: 'Confirmation de suppression',
      message: 'Êtes-vous sûr de vouloir supprimer cette facture ?',
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
    axios.delete(`http://localhost:3000/api/del_fact/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(() => {
      alert('Facture supprimée avec succès');
      fetchFactures();
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de la facture :', error);
      alert('Échec de la suppression de la facture');
    });
  };
  

  const handleEdit = (id) => {
    navigate(`/modifier_facture_agent/${id}`);
  };

  const handleDownloadPdf = (facture) => {
    const doc = new jsPDF();
  
    
  
  
    // Titre de la facture
    doc.setFontSize(12);
    doc.text('Tunisie Telecom', 14, 22);
    doc.text('Direction centrale des finances,Montplaisir', 14, 27);

  
    // Informations du client
    doc.text(`Facturé à:`, 120, 22);
    doc.text(`${facture.fournisseur}`, 120, 27);
    doc.text('tunis', 120, 37);
    doc.text('+216 71 856 459', 120, 42);
  
    // Détails de la facture
    doc.setFontSize(10);
    doc.text(`Date d’émission: ${facture.date_fact}`, 14, 50);
    doc.text(`numéro facture: ${facture.num_fact}`, 14, 55);
    doc.text(`montant: ${facture.montant} TND`, 14, 60);
  
    // Table des articles
    doc.autoTable({
      startY: 65,
      theme: 'grid',
      head: [['Référence', 'Fournisseur', 'Direction', 'Numéro de facture', 'Date de Facture', 'Montant', 'Objet', 'Statut']],
      body: [
        [
          facture.id,
          facture.fournisseur,
          facture.dossier,
          facture.num_fact,
          facture.date_fact,
          `${facture.montant} TND`,
          facture.objet,
          facture.statut
        ],
      ],
    });
  
    // Notes
    doc.setFontSize(10);
    doc.text('Notes', 14, doc.lastAutoTable.finalY + 10);
    doc.text('Merci pour votre confiance!', 14, doc.lastAutoTable.finalY + 15);
  

    // Sauvegarder le PDF
    doc.save(`Facture_${facture.id}.pdf`);
  };


  const handleArchive = (id) => {
    const token = localStorage.getItem('token');
    axios.post(`http://localhost:3000/api/facture/archive/${id}`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(() => {
      alert('Facture archivée avec succès');
      fetchFactures(); // Refresh factures after archiving
    })
    .catch(error => {
      console.error('Erreur d’archivage de la facture :', error);
      alert('Échec de l’archivage de la facture');
    });
  };

  // Function to determine the color based on the status
  const getStatusColor = (statut) => {
    if (statut === 'En cours') return 'green'; 
    else if (statut === 'Impayée') return 'red';
    else if (statut === 'A payé') return 'pink';
    else if (statut === 'Payée') return 'blue';
   
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
    const indexOfFirstItem = selectedPage * itemsPerPage;
    const displayed = factures.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);
    setDisplayedFactures(displayed);
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
          <ReactPaginate
            previousLabel={'Précédent'}
            nextLabel={'Suivant'}
            breakLabel={'...'}
            pageCount={Math.ceil(factures.length / itemsPerPage)}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factfournisseur;
