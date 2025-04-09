const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Add method to compare password
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); // compare with the hashed password
};

// Add method to return user data without password
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password; // Remove password before sending user data to the frontend
  return userObject;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
