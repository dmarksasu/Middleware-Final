const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const apiRoutes = require('./routes/api');  // Routes for the API
const authRoutes = require('./routes/auth');  // Routes for authentication
const errorHandler = require('./middleware/errorHandler');  // Error handling middleware
const connectDB = require('./config/db');  // Optional if you're using a separate DB config file
const cors = require('cors');  // CORS middleware
const cookieParser = require('cookie-parser');  // To parse cookies
const authMiddleware = require('./middleware/auth');  // Authentication middleware (to protect /profile route)

dotenv.config();

const app = express();

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Set the views directory

// Middleware for CORS
app.use(cors());

// Middleware for cookies (to parse cookies in requests)
app.use(cookieParser());

// Middleware for JSON and form submissions
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse form bodies

// Add the authentication routes
app.use('/', authRoutes);

// Add the API routes
app.use('/api', apiRoutes);

// Add the profile route, with authentication middleware
app.get('/profile', authMiddleware, (req, res) => {
  // Render the profile page (this assumes you have a profile.ejs file in your views folder)
  res.render('profile', { user: req.user });  // Pass user data to the profile page
});

// Error handling middleware (must come after routes)
app.use(errorHandler);

// DB Connection & Server Start
const PORT = process.env.PORT || 5000;  // Set the port, default to 5000

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`To test the IFT 458 REST App, go to: http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('DB connection error:', err));
