const { getUserByEmail, createUser,getAllUsers ,getAllFactures,postFacture ,postReclamation,
  getAllReclamations,getFactureById,updateFacture,updateUserPassword,archiveFacture,
  getReclamationById  , deleteUser , postArchive, getAllArchives, getArchiveById,deleterec,
  getUserById, updateUser, deletefacture ,deletearchive} = require('../model/index.js');
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
     res.status(500).json({ error: 'Internal Server Error' });
  }
 }; 
 const loginUser =async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('User not found', 404); // This will be caught by the error handling middleware
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password', 401);
  }

  const secretKey = process.env.TOKEN_SECRET;
  if (!secretKey) {
    throw new Error('Internal Server Error: Missing TOKEN_SECRET', 500);
  }

  const token = jwt.sign({ user_id: user.id, email: user.email, profil: user.profil }, secretKey, { expiresIn: '24h' });
  res.status(200).json({ token, email: user.email, profil: user.profil, user_id: user.id });
};

 

 
const createUserAccount = async (req, res) => {
  const { email, password, name, profil} = req.body;  
  console.log(`Profil value: ${profil}`);
   const hashedPassword = await bcrypt.hash(password, 10);  
  
  await createUser(email, hashedPassword, name, profil );
 
  res.status(201).json({ message: 'User account created successfully' });
 };

 const deleteUserAccount = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }  
};

const getuserById = async (req, res) => {
  const { id } = req.params;
  try {
      const user = await getUserById(id); // Assuming 'userModel' is where you've defined your model functions
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateFactureController = async (req, res) => {
  const { id } = req.params;
  const { fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion } = req.body;
  try {
    await updateFacture(id, fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion);
    res.status(200).json({ message: 'Facture updated successfully' });
  } catch (error) {
    console.error('Failed to update facture:', error);
    res.status(500).json({ message: 'Failed to update facture', error: error.message });
  }
}; 
      
 
 
   
 
 //password
 const changeUserPassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  try {
    await updateUserPassword(email, currentPassword, newPassword);
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// // Reset Password Endpoint  
// const resetPassword = async (req, res) => { 
//   const { token, newPassword } = req.body;
//   const user = await findUserByResetToken(token);
//   if (!user) {
//       return res.status(400).json({ error: 'Invalid or expired token' });
//   }

//   const hashedPassword = await bcrypt.hash(newPassword, 10);
//   await db.query('UPDATE users SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE email = ?', [hashedPassword, user.email]);
//   res.json({ message: 'Password successfully reset' });
// }; 






 //Archive
 const postArchives = async (req, res) => {
  const { fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion } = req.body;
  console.log(req.body);  
  try {
      await postArchive(fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion);
      res.status(201).json({ message: 'Facture created successfully' });
  } catch (error) {
      console.error('Failed to insert facture:', error);
      res.status(500).json({ message: 'Failed to create facture', error: error.message });
  }
};

const getAllArchivesController = async (req, res) => {
  try {
    const archives = await getAllArchives();
    res.status(200).json(archives);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
}; 

const getArchiveController = async (req, res) => {
  const { id } = req.params;
  try {
    const archive = await getArchiveById(id);
    res.status(200).json(archive);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Facture not found', error: error.message });
  }
};


const deleteArchiveAccount = async (req, res) => {
  const { id } = req.params;
  try {
    await deletearchive(id);
    res.status(200).json({ message: 'Facture deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}; 






 //factures
 const postFactures = async (req, res) => {
  const { fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion } = req.body;
  console.log(req.body);  
  try {
      await postFacture(fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion);
      res.status(201).json({ message: 'Facture created successfully' });
  } catch (error) {
      console.error('Failed to insert facture:', error);
      res.status(500).json({ message: 'Failed to create facture', error: error.message });
  }
};

const getAllFacturesController = async (req, res) => {
  try {
    const factures = await getAllFactures();
    res.status(200).json(factures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
}; 


const deleteFactureAccount = async (req, res) => {
  const { id } = req.params;
  try {
    await deletefacture(id);
    res.status(200).json({ message: 'Facture deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};  

const getFactureController = async (req, res) => {
  const { id } = req.params;
  try {
    const facture = await getFactureById(id);
    res.status(200).json(facture);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Facture not found', error: error.message });
  }
};


// Controller reclamation
const postReclamationController = async (req, res) => {
  const { user_id, title, description, email } = req.body;
  try {
    await postReclamation(user_id, title, description, email);
    res.status(201).json({ message: 'Reclamation created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllReclamationsController = async (req, res) => {
  try { 
    const reclamations = await getAllReclamations();
    res.status(200).json(reclamations);
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteReclamationAccount = async (req, res) => {
  const { id } = req.params;
  try {
    await deleterec(id);
    res.status(200).json({ message: 'reclamation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};  
const archiveFactureController = async (req, res) => {
  const { id } = req.params;
  try {
    await archiveFacture(id);
    res.status(200).json({ message: 'Facture archived successfully' });
  } catch (error) {
    console.error('Failed to archive facture:', error);
    res.status(500).json({ message: 'Failed to archive facture', error: error.message });
  }
};


 


module.exports = { loginUser, createUserAccount, getAllUserss,postFactures ,getAllFacturesController ,   postReclamationController,
  getAllReclamationsController, getuserById,getFactureController,updateFactureController,
  getReclamationByIdController , updateUserAccount,changeUserPassword,archiveFactureController,
  deleteUserAccount , deleteFactureAccount , postArchives , getArchiveController , getAllArchivesController
, deleteReclamationAccount,deleteArchiveAccount};
 