import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



//fournisseur interfaces
import Login1 from './component/login/Login1.js';
import Form from './component/form_facture/Form_fournisseur.js';
import Factfournisseur from './component/list_fact_fournisseur/Fact_fournisseur.js';
import Changepass from './component/change_pass/Changepass.js';
import Dash from './component/dash_fournisseur/Dash.js';
import Contact from './component/contact_us/Contact.js'
import EditFact_F from './component/edit_fact/EditFact_F.js'


//agent BOF interfaces 
import Dash2 from './component/dash_fournisseur/Dash2.js';
import FactfournisseurAg from './component/list_fact_fournisseur/Fact_Ag.js';
import FormAg from './component/form_facture/Form_Ag.js';
import User from './component/user/User_Ag.js';
import Adduser from './component/add_user/Add_user.js';
import Listcontact from './component/list_contact/List_contact_Ag.js';
import ChangepassAg from './component/change_pass/ChangepassAg.js';
import EditFact_Ag from './component/edit_fact/EditFact_AG.js';
import Edituser_Ag from './component/edit_user/Edituser_Ag.js';



//admin interfaces
import Useradmin from './component/user/User_admin.js';
import Factadmin from './component/list_fact_fournisseur/Fact_Admin.js';
import Adduseradmin from './component/add_user/Add_user_admin.js';
import Listcontactadmin from './component/list_contact/List_contact_admin.js';
import FactAdmin from './component/list_fact_fournisseur/Fact_Admin.js';
import Formadmin from './component/form_facture/Form_admin.js';
import Changepassadmin from './component/change_pass/Change_pass_admin.js';
import EditUser from './component/edit_user/Editoneuser.js'
import EditFact_admin from './component/edit_fact/EditFact_admin.js'
import Archive from './component/archive/Archive.js'

function App() {  
 return (  

    <Router>
      <Routes>
        <Route path="/" element={<Login1 />} />
        <Route path="/formulaire" element={<Form />} /> 
        <Route path="/Form_admin" element={<Formadmin />} /> 
        <Route path="/formulaireAg" element={<FormAg />} /> 
        <Route path="/liste_facture" element={<Factfournisseur />} />
        <Route path="/liste_factureAG" element={<FactfournisseurAg />} />
        <Route path="/Dashboard" element={<Dash />} />
        <Route path="/DashboardAg" element={<Dash2 />} />
        <Route path="/changepass" element={<Changepass />} />
        <Route path="/changepassAg" element={<ChangepassAg />} />
        <Route path="/Changepass_admin" element={<Changepassadmin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/List_contact" element={<Listcontact />} />
        <Route path="/Fact_Admin" element={<FactAdmin />} />
        <Route path="/user" element={<User />} />
        <Route path="/User_admin" element={<Useradmin />} /> 
        <Route path="/Adduser" element={<Adduser />} />
        <Route path="/Fact_admin" element={<Factadmin />} /> 
        <Route path="/Add_user_admin" element={<Adduseradmin />} />
        <Route path="/Listcontact_admin" element={<Listcontactadmin />} /> 
        <Route path="/edituser/:id" element={<EditUser />} />
        <Route path="/Edituser_Ag/:id" element={<Edituser_Ag/>} />
        <Route path="/Archive" element={<Archive/>} />


        <Route path="/editfact_admin/:id" element={<EditFact_admin />} />
        <Route path="/editfact_Ag/:id" element={<EditFact_Ag />} />
        <Route path="/editfact_F/:id" element={<EditFact_F />} />
      </Routes>
    </Router>

 );
}

export default App;