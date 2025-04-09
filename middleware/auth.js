const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Read token from cookies instead of headers
  const token = req.cookies.authToken;  // This will now look for a cookie named "authToken"
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach the decoded token payload to the request object
    next();  // Allow the request to continue to the next middleware/route handler
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};
