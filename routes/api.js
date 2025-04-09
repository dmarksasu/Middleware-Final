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

router.get('/profile', authMiddleware, (req, res) => {
    // Get the user's profile data from the database or from the token
    res.json({ message: "This is your profile." });
  });
  
  router.get('/test', authMiddleware, testEndpoint);
  
  module.exports = router;
