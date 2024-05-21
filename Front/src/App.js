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
import Archive from './component/archive/Archive.js'


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
import Dash_admin from './component/dash_fournisseur/dash_admin.js';
import Archive_admin from './component/archive/Archive_admin.js'


//responsable interfaces
import Trait from './component/trait_facture/Trait.js';
import Fact_res from './component/list_fact_fournisseur/Fact_res.js';
import Form_res from './component/form_facture/Form_res.js';
import EditFact_res from './component/edit_fact/EditFact_res.js';
import Listcontact_res from './component/list_contact/List_contact_res.js';
import Archive_res from './component/archive/Archive_res.js'
import Change_pass_res from './component/change_pass/Change_pass_res.js'
import Dash_responsable from './component/dash_fournisseur/Dash_res.js';




function App() {  
 return (  

    <Router>
      <Routes>
        <Route path="/" element={<Login1 />} />

        <Route path="/formulaire_fournisseur" element={<Form />} /> 
        <Route path="/formulaire_admin" element={<Formadmin />} /> 
        <Route path="/formulaire_agent" element={<FormAg />} /> 
        <Route path="/Formulaire_responsable" element={<Form_res/>} />
       


        <Route path="/liste_facture_fournisseur" element={<Factfournisseur />} />
        <Route path="/liste_facture_Agent" element={<FactfournisseurAg />} />
        <Route path="/Listes_factures_responsable" element={<Fact_res/>} />
        <Route path="/Listes_factures_admin" element={<FactAdmin />} />
     

        <Route path="/Listes_Utilisateurs_agent" element={<User />} />
        <Route path="/Listes_Utilisateurs_admin" element={<Useradmin />} /> 

        <Route path="/ajouter_utlilisateur_agent" element={<Adduser />} />
        <Route path="/ajouter_utlilisateur_admin" element={<Adduseradmin />} />
        
        <Route path="/modifier_utilisateur_admin/:id" element={<EditUser />} />
        <Route path="/modifier_utilisateur_agent/:id" element={<Edituser_Ag/>} />

         
        <Route path="/traitement_facture" element={<Trait/>} />


        <Route path="/ajouter_Réclamation" element={<Contact />} />
        <Route path="/listes_Réclamtion_responsable" element={<Listcontact_res/>} />
        <Route path="/listes_Réclamtion_admin" element={<Listcontactadmin />} /> 
        <Route path="/listes_Réclamtion" element={<Listcontact />} />


        <Route path="/information_personnel_responsable" element={<Change_pass_res/>} />
        <Route path="/information_personnel" element={<Changepass />} />
        <Route path="/information_personnel_agent" element={<ChangepassAg />} />
        <Route path="/information_personnel_admin" element={<Changepassadmin />} />

        <Route path="/Archive_admin" element={<Archive_admin/>} />
        <Route path="/Archive_agent" element={<Archive/>} />
        <Route path="/Archive_responsable" element={<Archive_res/>} />

        <Route path="/modifier_facture_admin/:id" element={<EditFact_admin />} />
        <Route path="/modifier_facture_agent/:id" element={<EditFact_Ag />} />
        <Route path="/modifier_facture_responsable/:id" element={<EditFact_res/>} />
        <Route path="/modifier_facture_fournisseur/:id" element={<EditFact_F />} />

        <Route path="/Dashboard_responsable" element={<Dash_responsable />} />
        <Route path="/Dashboard_admin" element={<Dash_admin />} />
        <Route path="/Dashboard" element={<Dash />} />
        <Route path="/DashboardAg" element={<Dash2 />} />
      </Routes>
    </Router>

 );
}

export default App;