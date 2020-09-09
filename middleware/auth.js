const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if there is token
  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'No token, authorization denied' }] });
  }

  // Verify token
  try {
    // get payload
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // any route using this middleware will be able to get user
    req.user = decoded.user;
    next();
  } catch (err) {
    // token invalid
    res.status(401).json({ errors: [{ msg: 'Token is not valid' }] });
  }
}