import React, { useState } from "react";
import axios from 'axios';
import "../form_facture/Form.css";
import NavbarF from '../navbar/Navbar_admin.js';
import { confirmAlert } from 'react-confirm-alert'; // Import for confirmation dialog
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css for dialog

function Form() {
  const [formData, setFormData] = useState({
    dossier: 'Direction Centrale de finance (DCF)',
    fournisseur: '',
    periode_conso: '',
    num_fact: '',
    device: '',
    date_fact: '',
    pathpdf: null,
    num_po: '',
    date_receprion: '',
    montant: '',
    objet: 'NOUVELLE_FACTURE',
    statut: 'En cours'
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirmer la création',
      message: 'Êtes-vous sûr de vouloir déposer cette facture ?',
      buttons: [
        {
          label: 'Oui',
          onClick: () => submitFacture()
        },
        {
          label: 'Non',
          onClick: () => {}
        }
      ]
    });
  };

  const submitFacture = async () => {
    const data = new FormData();
    Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
    });

    try { 
      const response = await axios.post('http://localhost:3000/api/facture_res', data);
      alert('Facture créée avec succès !'); 
      window.location.href = '/Liste_facture_fournisseur';
    } catch (error) {
      console.error('Erreur lors de l’envoi du formulaire :', error.response ? error.response.data : error);
      alert('Impossible de créer la facture. Erreur: ' + (error.response ? error.response.data.message : error.message));
    } 
  };

  return (
    <div className="allF">
      <NavbarF />
      <div className="pos">
        <h2 id="T_1">nouvelle facture</h2>
        <div className="invoiceForm">
          <form id="invoiceForm" onSubmit={handleSubmit}>
            <div className="D_1">
              <label htmlFor="nature">direction :</label>
              <input type="text" id="dossier" name="dossier" placeholder="direction" required onChange={handleInputChange}  defaultValue="Direction Centrale de fianance (DCF)" readOnly />

              <label htmlFor="fournisseur">Fournisseur :</label>
              <input type="text" id="fournisseur" name="fournisseur" placeholder="Fournisseur" required onChange={handleInputChange} />
            </div>
            <div className="D_1">
              <label htmlFor="delaiDePaiement">Delai de paiement :</label>
              <input type="date" id="periode_conso" name="periode_conso" placeholder="Delai de paiement" required onChange={handleInputChange} />

              <label htmlFor="numeroFacture">Numéro Facture :</label>
              <input type="text" id="num_fact" name="num_fact" placeholder="Numéro Facture" required onChange={handleInputChange} />
            </div>
            <div className="D_1">
              <label htmlFor="devise">Devise :</label>
              <input type="text" id="device" name="device" placeholder="Devise" required onChange={handleInputChange} />

              <label htmlFor="dateReception">Date de réception :</label>
              <input type="date" id="date_receprion" name="date_receprion" required onChange={handleInputChange} />
            </div>
            <div className="D_1">
              <label htmlFor="uploadDocument">Facture en PDF :</label>
              <input type="file" id="pathpdf" name="pathpdf" accept=".pdf,.zip,.rar"  onChange={handleInputChange} />

              <label htmlFor="numeroPO">Numéro bon de commande :</label>
              <input type="text" id="num_po" name="num_po" placeholder="Numéro bon de commande" required onChange={handleInputChange} />
            </div>
            <div className="D_1">
            
              <label htmlFor="date_fact">Date facture:</label>
              <input type="date" id="date_fact" name="date_fact" required onChange={handleInputChange} />

            </div>
            <div className="D_1">
              <label htmlFor="montant">montant :</label>
              <input type="text" id="montant" name="montant" placeholder="montant" required onChange={handleInputChange} />

              <label htmlFor="objet">Object :</label>
              <select id="objet" name="objet" required onChange={handleInputChange} defaultValue="NOUVELLE_FACTURE">
                <option value="NOUVELLE_FACTURE">NOUVELLE FACTURE</option>
                <option value="ANNULE_ET_REMPLACE">ANNULE ET REMPLACE</option>
                <option value="AVOIR">AVOIR</option>
                <option value="FICHE_DINTERVENTION">FICHE D'INTERVENTION</option>
                <option value="MEMOIRE_DE_REGLEMENT">MEMOIRE DE REGLEMENT</option>
                <option value="MR">MR</option>
                <option value="NOTE_DE_DEBIT">NOTE DE DEBIT</option>
                <option value="NOTE_DE_REMBOURSEMENT">NOTE DE REMBOURSEMENT</option>
                <option value="OUVERTURE_DE_LETTRE_DE_CREDIT__LC_">OUVERTURE DE LETTRE DE CREDIT (LC)</option>
                <option value="PENALITE">PÉNALITÉ</option>
                <option value="PENALITE_DE_RETARD">PÉNALITÉ DE RETARD</option>
              </select>
            </div>
            <button type="submit" className="button_inv">
              <span className="button__text">déposer</span>
              <span className="button__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className="svg">
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
                </svg>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;