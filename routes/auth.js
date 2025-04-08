const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Home route (index)
router.get('/', (req, res) => {
  res.render('index');
});

// Login route
router.get('/login', (req, res) => {
  res.render('login');
});

// Register route
router.get('/register', (req, res) => {
  res.render('register');
});

// Profile route (protected)
router.get('/profile', authMiddleware, (req, res) => {
  res.render('profile', { user: req.user });
});

// Handle registration
router.post('/register', register);

// Handle login
router.post('/login', login);

// Handle logout
router.get('/logout', (req, res) => {
  res.clearCookie('authToken');  // Optional: Clear the cookie if you set it for JWT
  res.redirect('/');
});


module.exports = router;
