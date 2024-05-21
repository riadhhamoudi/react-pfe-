const { getUserByEmail, createUser,getAllUsers ,getAllFactures,postFacture ,postReclamation,
  getAllReclamations,getFactureById,updateFacture,updateUserPassword,archiveFacture,getFacturesByUserId,
  getReclamationById  , deleteUser , postArchive, getAllArchives, getArchiveById,deleterec,
  getUserById, updateUser, deletefacture ,deletearchive, postFactureP , getAllFacturesP
,acceptFacture , deletefactureP , getFactureNById} = require('../model/index.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
// const nodemailer = require('nodemailer');

//users
const getAllUserss = async (req, res) => {
  try {
     const users = await getAllUsers();
     console.log(users) 
     res.status(200).json(users);
  } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Erreur de serveur interne' });
  }
 }; 



 const loginUser =async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('Utilisateur introuvable', 404); // This will be caught by the error handling middleware
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Mot de passe invalide', 401);
  }

  const secretKey = process.env.TOKEN_SECRET;
  if (!secretKey) {
    throw new Error('Erreur de serveur interne : TOKEN_SECRET manquante', 500);
  }

  const token = jwt.sign({ user_id: user.id ,  email: user.email, profil: user.profil ,telephone: user.telephone , secondary_name: user.secondary_name , address: user.address }, secretKey, { expiresIn: '24h' });
  res.status(200).json({ token, email: user.email, profil: user.profil, user_id: user.id ,telephone: user.telephone , secondary_name: user.secondary_name , address: user.address });
};

 

 
const createUserAccount = async (req, res) => {
  const { email, password, name , profil ,  secondary_name ,telephone  , address} = req.body;  
  console.log(`Profil value: ${profil}`);
   const hashedPassword = await bcrypt.hash(password, 10);  
  
  await createUser(email, hashedPassword, name , profil ,secondary_name ,telephone ,  address );
 
  res.status(201).json({ message: 'Compte utilisateur créé avec succès' });
 }; 

 const deleteUserAccount = async (req, res) => {
  const { id } = req.params; 
  try { 
    await deleteUser(id);
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur interne' });
  }
}; 

const updateUserAccount = async (req, res) => {
  const { id } = req.params;
  const { email, password, name, profil, secondary_name, telephone, address } = req.body;
  let hashedPassword = password;
    // Check if the password was provided and needs to be hashed
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  
  try {
    await updateUser(id, email, hashedPassword, name, profil, secondary_name, telephone, address);
    res.status(200).json({ message: 'Mise à jour réussie de l’utilisateur' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur interne' });
  }  
};

const getuserById = async (req, res) => {
  const { id } = req.params;
  try {
      const user = await getUserById(id); // Assuming 'userModel' is where you've defined your model functions
      if (!user) {
          return res.status(404).json({ error: 'Utilisateur introuvable' });
      }
      res.status(200).json(user);
  } catch (error) {
      console.error('Erreur lors de la récupération de utilisateur :', error);
      res.status(500).json({ error: 'Erreur de serveur interne' });
  }
};

const updateFactureController = async (req, res) => {
  const { id } = req.params;
  const { fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion } = req.body;
  try {
    await updateFacture(id, fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion);
    res.status(200).json({ message: 'Facture mise à jour avec succès' });
  } catch (error) {
    console.error('Échec de la mise à jour de la facture :', error);
    res.status(500).json({ message: 'Échec de la mise à jour de la facture', error: error.message });
  }
};  
      
 
 
   
 
 //password
 const changeUserPassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  try {
    await updateUserPassword(email, currentPassword, newPassword);
    res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur interne' });
  }
};



 //Archive
 const postArchives = async (req, res) => {
  const { fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion } = req.body;
  console.log(req.body);  
  try {
      await postArchive(fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion);
      res.status(201).json({ message: 'Facture créée avec succès' });
  } catch (error) {
      console.error('Défaut insertion de la facture :', error);
      res.status(500).json({ message: 'Échec de la création de la facture', error: error.message });
  }
};

const getAllArchivesController = async (req, res) => {
  try {
    const archives = await getAllArchives();
    res.status(200).json(archives);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur interne' }); 
  }
}; 

const getArchiveController = async (req, res) => {
  const { id } = req.params;
  try {
    const archive = await getArchiveById(id);
    res.status(200).json(archive);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Facture introuvable', error: error.message });
  }
};


const deleteArchiveAccount = async (req, res) => {
  const { id } = req.params;
  try {
    await deletearchive(id);
    res.status(200).json({ message: 'Facture supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur interne' });
  }
}; 

const archiveFactureController = async (req, res) => {
  const { id } = req.params;
  try {
    await archiveFacture(id);
    res.status(200).json({ message: 'Facture archivée avec succès' });
  } catch (error) {
    console.error('Échec de l’archivage de la facture :', error);
    res.status(500).json({ message: 'Échec de archivage de la facture', error: error.message });
  }
}; 



//prés-facture
const postFacturesP = async (req, res) => {
  const { fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion } = req.body;
  console.log(req.body);  
  try {
      await postFactureP(fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion);
      res.status(201).json({ message: 'Facture créée avec succès' });
  } catch (error) {
      console.error('Défaut d’insertion de la facture :', error);
      res.status(500).json({ message: 'Échec de la création de la facture', error: error.message });
  }
};


const getAllFacturesControllerP = async (req, res) => {
  try {
    const factures = await getAllFacturesP();
    res.status(200).json(factures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur interne' }); 
  }
}; 

const acceptFactureController = async (req, res) => {
  const { id } = req.params;
  try {
    await acceptFacture(id);
    res.status(200).json({ message: 'facture accepté' });
  } catch (error) {
    console.error('Refus acceptation de la facture :', error);
    res.status(500).json({ message: 'facture refusé', error: error.message });
  }
}; 


const deleteFacturePAccount = async (req, res) => {
  const { id } = req.params;
  try {
    await deletefactureP(id);
    res.status(200).json({ message: 'Facture supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur interne' });
  }
};  






 //factures
 const postFactures = async (req, res) => {
  const { fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion } = req.body;
  const user_id = req.user.user_id; // Extract user_id from authenticated user
  console.log('User ID:', user_id); // Log the user_id

  console.log(req.body);  
  try {
    await postFacture(fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion);
    res.status(201).json({ message: 'Facture créée avec succès' });
  } catch (error) {
    console.error('Défaut d’insertion de la facture :', error);
    res.status(500).json({ message: 'Échec de la création de la facture', error: error.message });
  }
};


const getAllFacturesController = async (req, res) => {
  try {
    const factures = await getAllFactures();
    res.status(200).json(factures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur interne' }); 
  }
}; 


const deleteFactureAccount = async (req, res) => {
  const { id } = req.params;
  try {
    await deletefacture(id);
    res.status(200).json({ message: 'Facture supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur interne' });
  }
};  

const getFactureController = async (req, res) => {
  const { id } = req.params;
  try {
    const facture = await getFactureById(id);
    res.status(200).json(facture);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Facture introuvable', error: error.message });
  }
};



const getFactureNController = async (req, res) => {
  const { fournisseur } = req.body;
  try {
    const factureF = await getFactureNById(fournisseur);
    res.status(200).json(factureF);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Facture introuvable', error: error.message });
  }
};





const getFacturesByUserIdController = async (req, res) => {
  const { user_id } = req.params;
  try {
    const factures = await getFacturesByUserId(user_id);
    res.status(200).json(factures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur interne' });
  }
};
// Controller reclamation
const postReclamationController = async (req, res) => {
  const {  title, description, email } = req.body;
  try {
    await postReclamation( title, description, email);
    res.status(201).json({ message: 'Récupération créée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur interne' });
  }
};

const getAllReclamationsController = async (req, res) => {
  try { 
    const reclamations = await getAllReclamations();
    res.status(200).json(reclamations);
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur interne' });
  }
};

const getReclamationByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const reclamation = await getReclamationById(id);
    if (!reclamation) {
      return res.status(404).json({ error: 'Reclamation not found' });
    }
    res.status(200).json(reclamation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Récupération introuvable' });
  }
};


const deleteReclamationAccount = async (req, res) => {
  const { id } = req.params;
  try {
    await deleterec(id);
    res.status(200).json({ message: 'Récupération supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur de serveur interne' });
  }
};  



 


module.exports = { loginUser, createUserAccount, getAllUserss,postFactures ,getAllFacturesController ,   postReclamationController,
  getAllReclamationsController, getuserById,getFactureController,updateFactureController,getFacturesByUserIdController,
  getReclamationByIdController , updateUserAccount,changeUserPassword,archiveFactureController,
  deleteUserAccount , deleteFactureAccount , postArchives , getArchiveController , getAllArchivesController
, deleteReclamationAccount,deleteArchiveAccount, getFactureNController
, postFacturesP , getAllFacturesControllerP , acceptFactureController , deleteFacturePAccount};
 