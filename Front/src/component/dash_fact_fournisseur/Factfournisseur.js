import React from 'react';
import  '../dash_fact_fournisseur/Fact_fournisseur.css';

import Navbar1 from '../navbar/Navbar1.js'


const Factfournisseur = () => (
  <div className="all">
  <Navbar1/>
  <table className='tab'>
    <thead>
      <tr> 
        <th>id</th>
        <th>reférence</th>
        <th>nature</th>
        <th>Statut</th>
        <th>nbFactures</th>
        <th>Date de création</th>
        <th>responsable</th>
        <th>action</th>
        <th>object </th>
        <th>Amount  </th>
        <th> Date of Invoice </th>
        <th>Number of PO   </th>
      </tr>
    </thead>
    <tbody>
      {projects.map((project, index) => (
        <tr key={index}>
          <td>{project.id}</td>
          <td>{project.reférence}</td>
          <td>{project.nature}</td>
          <td>{project.Statut}</td>
          <td>{project.nbFactures}</td>
          <td>{project.Datedecréation}</td>
          <td>{project.responsable}</td>
          <td>{project.action}</td>
          <td>{project.action}</td>
          <td>{project.action}</td>
          <td>{project.action}</td>
          <td>{project.action}</td>
         
        </tr>
      ))}
    </tbody>
  </table>

  </div>
);

const projects = [
  {
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
    objet:"jfqjfjdfn"
  }, {
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  }, {
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  }, {
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  }, {
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  }, {
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  }, {
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  },{
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  },{
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  },{
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  },{
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  },{
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  },{
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  },{
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  },{
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  },{
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  },{
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  },{
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  },{
    id:'7200',
    Datedecréation: 'Tue, 28 Feb, 2017',
    reférence: 'fh512ze',
    nature: '3Wm',
    Statut: 'EN cour',
    nbFactures: '10',
    responsable: 'riadh',
    action:'kjnfeouizenf',
  },
  // ... other projects
];

export default Factfournisseur;