const express = require('express');
const router = express.Router();
const { testEndpoint } = require('../controllers/apiController');
const authController = require('../controllers/authController'); // Correct import here
const authMiddleware = require('../middleware/auth');
const User = require('../models/User'); 

// Public routes
router.post('/register', authController.register);  // Registration route
router.post('/login', authController.login);        // Login route

// Protected routes
router.get('/test', authMiddleware, testEndpoint);   // Protected test route

module.exports = router;
