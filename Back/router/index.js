const express = require('express');
const router = express.Router();
const controller = require('../controller/index.js');

// Login route
router.post('/login', controller.loginUser);

// Forgot password route
// router.post('/forgot-password', controller.forgotPassword);

module.exports = router;
