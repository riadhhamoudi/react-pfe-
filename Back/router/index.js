  const express = require('express');
  const router = express.Router();
  const multer = require('multer');
  const { loginUser, changeUserPassword, createUserAccount ,getAllUserss,postFactures,getAllFacturesController  ,   postReclamationController,
    getAllReclamationsController,updateUserAccount,getuserById,updateFactureController,
    getReclamationByIdController ,getFactureController,archiveFactureController,
    deleteUserAccount ,deleteFactureAccount,deleteArchiveAccount, postArchives,getAllArchivesController,getArchiveController,deleteReclamationAccount
  } = require('../controller/index.js');

  const jwt = require('jsonwebtoken');




  

  // Authentication middleware
  const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET, (err, user) => {
      // if (err) {
      //   console.error('Invalid token:', err);
      //   return res.status(403).json({ error: 'Forbidden' });
      // }
      req.user = user; 
      next(); 
    });   
  };   



  
 
  const storage = multer.memoryStorage(); // or diskStorage, depending on need
const fileFilter = function (req, file, cb) {
  if (file.fieldname === "pathpdf" && file.mimetype.includes("pdf")) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

  //users  
  router.post('/login', loginUser);
  router.post('/admin', createUserAccount);  
  router.get('/users', getAllUserss);
  router.delete('/user/:id', authenticateToken, deleteUserAccount); 
  router.put('/user/:id', authenticateToken, updateUserAccount);
  router.get('/user/:id', authenticateToken, getuserById);

    
  // //password
  router.post('/change-password', authenticateToken, changeUserPassword);
 
  
  //facture
  router.post('/facture', upload.any(), postFactures);
  router.get('/factures', getAllFacturesController ); 
  router.delete('/del_fact/:id', authenticateToken, deleteFactureAccount);
  router.get('/fact/:id', getFactureController);
  router.put('/editfact/:id', authenticateToken, updateFactureController);
  



  // Route  reclamation
  router.post('/reclamation', authenticateToken, postReclamationController);
  router.get('/reclamations', authenticateToken, getAllReclamationsController);
  router.get('/reclamation/:id', authenticateToken, getReclamationByIdController);
  router.delete('/del_rec/:id', authenticateToken, deleteReclamationAccount);  



    //Archive
    router.post('/archive', upload.any(), postArchives);
    router.get('/archives', getAllArchivesController ); 
    router.get('/arch/:id', getArchiveController);
    router.delete('/del_arch/:id', authenticateToken, deleteArchiveAccount);
    router.post('/facture/archive/:id', upload.any(), authenticateToken, archiveFactureController);

  
 
module.exports = router;    
  














