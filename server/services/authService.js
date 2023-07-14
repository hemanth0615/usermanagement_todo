const jwt = require('jsonwebtoken');

// Generate a JSON Web Token (JWT)
const generateToken = (userId) => {
  // Create a payload containing the user ID
  const payload = { userId };

  // Generate the JWT with a secret key
  const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });

  return token;
};

module.exports = { generateToken };
