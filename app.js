const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Set the views directory

// Add the auth routes to the app
app.use('/', authRoutes);

// Middleware
app.use(express.json()); // for JSON bodies (like Postman)
app.use(express.urlencoded({ extended: true })); // for form submissions


// Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use(errorHandler);

// DB Connection & Server Start
//connectDB();

const cors = require('cors');
app.use(cors());


//DB Connection & Server Start
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log(`To test the IFT 458 REST App Click Or Type: http://localhost:5000`);
  })
  .catch(err => console.error(err));
