const express = require('express');
const router = express.Router();
const { testEndpoint } = require('../controllers/apiController');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const authController = require('../controllers/authController');


// Public
router.post('/register', authController.register); // no middleware here
router.post('/login', authController.login);       // also open


// Protected
router.get('/test', authMiddleware, testEndpoint);

module.exports = router;
