import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavbarF from '../navbar/Navbar_res';
import "./EditFact.css";
import { confirmAlert } from 'react-confirm-alert'; // Import for confirmation dialog
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css for dialog



function EditFact() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        dossier: '',
        fournisseur: '',
        periode_conso: '',
        num_fact: '',
        device: '',
        date_fact: '',
        pathpdf: null,
        num_po: '',
        date_receprion: '',
        montant: '',
        objet: '',
        statut: ''
    });

    // Fetch facture by ID
    useEffect(() => {
        const fetchFacture = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/fact/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération de la facture :', error);
            }
        }; 
        fetchFacture();
    }, [id]);

    // Update facture
    const updateFacture = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:3000/api/editfact/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Facture mise à jour avec succès :', response.data);
            alert('Facture mise à jour avec succès.');
            window.location.href = '/Listes_factures_responsable';
        } catch (error) {
            console.error('Échec de la mise à jour de la facture :', error);
            alert('Échec de la mise à jour de la facture.');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        confirmAlert({
            title: 'Confirmer la mise à jour',
            message: 'Êtes-vous sûr de vouloir enregistrer ces modifications ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => updateFacture()
                },
                {
                    label: 'Non',
                    onClick: () => {}
                }
            ]
        });
    };
    

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };
    return (
        <div className="allF1">
            <NavbarF />
            <div className="edit-facture-form">
                <form className="edit_form" onSubmit={handleFormSubmit}>
                    <div className="D_1">
                        <label htmlFor="dossier">Dossier :</label>
                        <input type="text" id="dossier" name="dossier" placeholder="Dossier" value={formData.dossier} onChange={handleInputChange} />
                    </div>
                    <div className="D_1">
                        <label htmlFor="fournisseur">Fournisseur :</label>
                        <input type="text" id="fournisseur" name="fournisseur" placeholder="Fournisseur" value={formData.fournisseur} onChange={handleInputChange} />
                    </div>
                    <div className="D_1">
                        <label htmlFor="periode_conso">Période de Consommation :</label>
                        <input type="text" id="periode_conso" name="periode_conso" placeholder="Période de Consommation" value={formData.periode_conso} onChange={handleInputChange} />
                    </div>
                    <div className="D_1">
                        <label htmlFor="num_fact">Numéro de Facture :</label>
                        <input type="text" id="num_fact" name="num_fact" placeholder="Numéro de Facture" value={formData.num_fact} onChange={handleInputChange} />
                    </div>
                    <div className="D_1">
                        <label htmlFor="device">Device :</label>
                        <input type="text" id="device" name="device" placeholder="Device" value={formData.device} onChange={handleInputChange} />
                    </div>
                    <div className="D_1">
                        <label htmlFor="date_fact">Date de Facture :</label>
                        <input type="date" id="date_fact" name="date_fact" placeholder="Date de Facture" value={formData.date_fact} onChange={handleInputChange} />
                    </div>
                    <div className="D_1">
                        <label htmlFor="pathpdf">Chemin du PDF :</label>
                        <input type="text" id="pathpdf" name="pathpdf" placeholder="Chemin du PDF" value={formData.pathpdf} onChange={handleInputChange} />
                    </div>
                    <div className="D_1">
                        <label htmlFor="num_po">Numéro de PO :</label>
                        <input type="text" id="num_po" name="num_po" placeholder="Numéro de PO" value={formData.num_po} onChange={handleInputChange} />
                    </div>
                    <div className="D_1">
                        <label htmlFor="date_reception">Date de Réception :</label>
                        <input type="date" id="date_reception" name="date_reception" placeholder="Date de Réception" value={formData.date_reception} onChange={handleInputChange} />
                    </div>
                    <div className="D_1">
                        <label htmlFor="montant">Montant :</label>
                        <input type="number" id="montant" name="montant" placeholder="Montant" value={formData.montant} onChange={handleInputChange} />
                    </div>
                    <div className="D_1">
                        <label htmlFor="statut">Statut :</label>
                        <select id="statut" name="statut" required onChange={handleInputChange}>
                            <option value="statut">Statut</option>
                            <option value="reçue">Reçue</option>
                            <option value="en cours">En cours</option>
                            <option value="A payé">A payé</option>
                            <option value="refusé">Refusé</option>
                        </select>
                    </div>
                    <button type="submit">Update Facture</button>
                </form>
            </div>
        </div>
    );
}

export default EditFact;
