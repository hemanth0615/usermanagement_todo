const jwt = require('jsonwebtoken');

// Authentication middleware
exports.authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }

    req.user = decoded; // Store the decoded user information in the request object
    next();
  });
};
