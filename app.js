const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const https = require('https');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();

// Load SSL certificate and key
const sslOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', authRoutes);
app.use('/api', apiRoutes);
app.get('/profile', authMiddleware, (req, res) => {
  res.render('profile', { user: req.user });
});

// Error handling
app.use(errorHandler);

// DB connection and HTTPS server start
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    // Start HTTPS server
    https.createServer(sslOptions, app).listen(PORT, () => {
      console.log(`🚀 HTTPS Server running on https://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('DB connection error:', err));
