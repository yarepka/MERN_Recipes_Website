const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const validateRequest = require('../../middleware/validateRequest');

// @route   GET api/auth
// @desc    Return user by token
// @access  Private(Private - Need token to be accessed)
router.get('/', auth, async (req, res) => {
  try {
    // returns user without password field
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send({ errors: [{ msg: 'Server error' }] });
  }
});

// @route   POST api/auth/
// @desc    Login & get token
// @access  Public (Public - don't need token to acces route)
router.post(
  '/',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  validateRequest,
  async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email: email });

      // User does not exists
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Check passwords match
      const isMatch = await bcrypt.compare(password, user.password);

      // Passwords do not match
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Create jwt payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Create jwt
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: config.get('jwtExpirationTime') },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({ token: token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

module.exports = router;
