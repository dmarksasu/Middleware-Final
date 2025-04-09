// controllers/authController.js
const User = require('../models/User');  // Assuming your User model is in models/User.js
const bcrypt = require('bcryptjs');      // For password hashing
const jwt = require('jsonwebtoken');     // If you need JWT for authentication

// Register function
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the new user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received email:", email);
  console.log("Received password:", password);

  try {
    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Debugging the stored password hash
    console.log("Stored password hash:", user.password);

    // Check if the password matches the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If password is correct, generate a JWT token (or session)
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ message: "Login successful", token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
