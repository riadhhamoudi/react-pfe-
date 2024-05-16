const express = require("express");
const path = require("path"); 
const app = express();
const port = 3000; 
const router = require("./router/index.js");
const cors = require("cors");

const nodemailer = require("nodemailer");
require('dotenv').config();
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json()); 
app.use('/api', router);
 
app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});     