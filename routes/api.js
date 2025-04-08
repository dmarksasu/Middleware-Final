const express = require('express');
const router = express.Router();
const { testEndpoint } = require('../controllers/apiController');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Public
router.post('/register', register);
router.post('/login', login);

// Protected
router.get('/test', authMiddleware, testEndpoint);

module.exports = router;
