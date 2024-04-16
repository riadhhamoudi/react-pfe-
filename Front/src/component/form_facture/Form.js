import React from "react";
import "../form_facture/Form.css";
import Navbar1 from '../navbar/Navbar1.js'



function Form() {
  return (
    <div className="all">
    <Navbar1/>
      <h2 id="T_1" >New Invoice Form</h2>
      <div className="invoiceForm">
      <form id="invoiceForm">
        <div className="D_1">
          <label htmlFor="nature">Nature 3WM :</label>
          <input type="text" id="nature" name="nature" placeholder="Nature 3WM" required />

          <label htmlFor="fournisseur">Fournisseur :</label>
          <input type="text" id="fournisseur" name="fournisseur" placeholder="Fournisseur" required />
        </div>
        <div className="D_1">
          <label htmlFor="delaiDePaiement">Delay of Payment :</label>
          <input type="text" id="delaiDePaiement" name="delaiDePaiement" placeholder="Delay of Payment" required/>

          <label htmlFor="numeroFacture">Number of the Invoice :</label>
          <input type="text" id="numeroFacture" name="numeroFacture" placeholder="Number of the Invoice"   required />
        </div>
        <div className="D_1">
          <label htmlFor="devise">Devise :</label>
          <input type="text" id="devise" name="devise" placeholder="Devise"   required/>

          <label htmlFor="dateReception">Date of Reception :</label>
          <input type="date" id="dateReception" name="dateReception" required/>
        </div>
        <div className="D_1">
          <label htmlFor="uploadDocument">Upload Document :</label>
          <input type="file" id="uploadDocument" name="uploadDocument" accept=".pdf,.zip,.rar" required/>

          <label htmlFor="numeroPO">Number of PO :</label>
          <input type="text" id="numeroPO" name="numeroPO" placeholder="Number of PO" required/>
        </div>
        <div className="D_1">
          <label htmlFor="idFiscale">ID Fiscal :</label>
          <input type="text" id="idFiscale" name="idFiscale" placeholder="ID Fiscal" required/>

          <label htmlFor="dateFacture">Date of Invoice :</label>
          <input type="date" id="dateFacture" name="dateFacture" required/>
        </div>
        <div className="D_1">
          <label htmlFor="montant">Amount :</label>
          <input type="text" id="montant" name="montant" placeholder="Amount" required/>

          <label htmlFor="objet">Object :</label>
          <select id="objet" name="objet" required>
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
        <input type="submit" value="Submit" required/>
      </form>
      </div>
    </div>
  );
}

export default Form;