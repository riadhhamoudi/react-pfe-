import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login1 from './component/login/Login1.js';
import Form from './component/form_facture/Form.js';
import Factfournisseur from './component/dash_fact_fournisseur/Factfournisseur.js';
import Changepass from './component/change_pass/Changepass.js';

function App()  {
  return (
  
      <Router>
      <Routes>
        <Route path="/" element={<Login1 />} />
        <Route path="/formulaire" element={<Form />}/>
          <Route path="/dashfournisseur" element={<Factfournisseur />} />
        <Route path="/changepass" element={<Changepass />} />
      </Routes>
    </Router>
  );
}

export default App;