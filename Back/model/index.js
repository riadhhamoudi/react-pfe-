const db = require('../Database/index.js');
const bcrypt = require('bcrypt');
const validator = require('validator');
const moment = require('moment');
  

// Functions for the 'users' table
const getUserByEmail = async (email) => { 
 const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
 return rows[0];
};
const getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  console.log(rows);
  return rows;
 }; 

 const createUser = async (email, password, name, profil, secondary_name, telephone, address) => {
  await db.query('INSERT INTO users (email, password, name, profil, secondary_name, telephone, address) VALUES (?, ?, ?, ?, ?, ?, ?)', 
  [email, password, name, profil, secondary_name, telephone, address]); 
};

const deleteUser = async (id) => {
  await db.query('DELETE FROM users WHERE id = ?', [id]);
};

const updateUser = async (id, email, password, name, profil, secondary_name, telephone, address) => {
  await db.query('UPDATE users SET email = ?, password = ?, name = ?, profil = ?, secondary_name = ?, telephone = ?, address = ? WHERE id = ?', 
  [email, password, name, profil, secondary_name, telephone, address, id]);
};
const getUserById = async (id) => {
  try {
      const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
      if (rows.length === 0) {
          return null; // No user found with the given ID
      }
      return rows[0]; // Return the found user
  } catch (error) {
      console.error('Database error in getUserById:', error);
      throw error;
  }
};

  



 
 //password
 const updateUserPassword = async (email, currentPassword, newPassword) => {
  try {
    console.log('Received email:', email);
    console.log('Received currentPassword:', currentPassword);
    console.log('Received newPassword:', newPassword);

    const user = await getUserByEmail(email);
    console.log('Fetched user:', user);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      throw new Error('Invalid current password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('Hashed new password:', hashedPassword);

    await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
    console.log('Password updated in the database');
  } catch (error) {
    console.error('Error in updateUserPassword:', error);
    throw error;
  }
};
//Archive
const postArchive = async (fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion) => {
  if (!date_fact) {
    throw new Error('date_fact cannot be empty');
  }
  // Additional validation checks can be added here
  await db.query('INSERT INTO archive (fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion]);
};

const getAllArchives = async () => {  
  const [rows] = await db.query('SELECT * FROM archive');  
  return rows;
 };  

 const getArchiveById = async (id) => {
  const [rows] = await db.query('SELECT * FROM archive WHERE id = ?', [id]);
  if (rows.length === 0) {
    throw new Error('Facture not found');
  }
  return rows[0]; 
};


const deletearchive = async (id) => {
  await db.query('DELETE FROM archive WHERE id = ?', [id]);
};













// factures
const postFacture = async (fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion) => {
  if (!date_fact) {
    throw new Error('date_fact cannot be empty');
  }
  // Additional validation checks can be added here
  await db.query('INSERT INTO facture (fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion]);
};
 
 const getAllFactures = async () => {  
  const [rows] = await db.query('SELECT * FROM facture');  
  return rows;
 };  
  
 const deletefacture = async (id) => {
  await db.query('DELETE FROM Facture WHERE id = ?', [id]);
};

const getFactureById = async (id) => {
  const [rows] = await db.query('SELECT * FROM facture WHERE id = ?', [id]);
  if (rows.length === 0) {
    throw new Error('Facture not found');
  }
  return rows[0]; 
};
const updateFacture = async (id, fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion) => {
  date_fact = moment(date_fact).format('YYYY-MM-DD'); // Converts to YYYY-MM-DD format
  date_receprion = moment(date_receprion).format('YYYY-MM-DD'); // Converts to YYYY-MM-DD format

  await db.query('UPDATE facture SET fournisseur = ?, dossier = ?, date_fact = ?, periode_conso = ?, num_fact = ?, device = ?, montant = ?, objet = ?, num_po = ?, statut = ?, pathpdf = ?, date_receprion = ? WHERE id = ?', [fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion, id]);
};
 
 // Functions for the 'reclamation' table
 

const postReclamation = async (user_id, title, description, email) => {
  await db.query('INSERT INTO reclamation (user_id, title, description, email) VALUES (?, ?, ?, ?)', [user_id, title, description, email]);
};

const getAllReclamations = async () => { 
  const [rows] = await db.query('SELECT * FROM reclamation');
  return rows;
};

const getReclamationById = async (id) => { 
  const [rows] = await db.query('SELECT * FROM reclamation WHERE id = ?', [id]);
  return rows[0];
};  
   
const deleterec = async (id) => {
  await db.query('DELETE FROM reclamation WHERE id = ?', [id]);
};


const archiveFacture = async (id) => {
  const connection = await db.getConnection(); // Get a connection from the pool
  try {
    // Start a transaction
    await connection.beginTransaction();

    // Get the facture by id
    const [factureRows] = await connection.query('SELECT * FROM facture WHERE id = ?', [id]);
    if (factureRows.length === 0) {
      throw new Error('Facture not found');
    }
    const facture = factureRows[0];

    // Insert the facture into the archive table
    await connection.query('INSERT INTO archive (fournisseur, dossier, date_fact, periode_conso, num_fact, device, montant, objet, num_po, statut, pathpdf, date_receprion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [facture.fournisseur, facture.dossier, facture.date_fact, facture.periode_conso, facture.num_fact, facture.device, facture.montant, facture.objet, facture.num_po, facture.statut, facture.pathpdf, facture.date_receprion]);

    // Delete the facture from the facture table
    await connection.query('DELETE FROM facture WHERE id = ?', [id]);

    // Commit the transaction
    await connection.commit(); 
  } catch (error) {
    // Rollback the transaction in case of error
    await connection.rollback();
    throw error;
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
};




  
module.exports = { getUserByEmail, createUser,  getAllUsers ,updateUserPassword,archiveFacture,
  postFacture ,getAllFactures , postReclamation,getUserById,getFactureById,updateFacture,
    getAllReclamations,  getReclamationById, updateUser , postArchive , getAllArchives , getArchiveById ,
    deleteUser , deleterec, deletefacture,deletearchive}; 