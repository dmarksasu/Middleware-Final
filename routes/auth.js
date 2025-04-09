const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');  // Middleware for protected routes

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
  // If the user is authenticated, render the profile page with user info
  res.render('profile', { user: req.user });
});

// Handle registration
router.post('/register', register);

// Handle login
router.post('/login', login);

// Handle logout
router.get('/logout', (req, res) => {
  res.clearCookie('authToken');  // Clear the cookie if using JWT in cookies for authentication
  res.redirect('/');
});

module.exports = router;
