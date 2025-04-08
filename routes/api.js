const express = require('express');
const router = express.Router();
const { testEndpoint } = require('../controllers/apiController');
const authMiddleware = require('../middleware/auth');

router.get('/test', authMiddleware, testEndpoint);

module.exports = router;
