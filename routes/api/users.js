const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body } = require('express-validator');
const fileUpload = require('express-fileupload');

const User = require('../../models/User');
const validateRequest = require('../../middleware/validateRequest');

// @route   POST api/users
// @desc    Register user & get token
// @access  Public (Public - don't need token to access route)
router.post('/',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { email, name, password } = req.body;

      // Check if user with specified email already exist
      let user = await User.findOne({ email: email });

      if (user) {
        // Matching the same object pattern as we did above
        return res.status(400).json({ errors: [{ msg: 'User already exist' }] });
      }

      // upload the file
      let imagePath;
      if (!req.files) {
        imagePath = config.get('defaultUserImage');
      } else {
        const file = req.files.file;
        console.log('file: ', file);

        imagePath = `user-${email + new Date().getMilliseconds()}`;
        await file.mv(`${__dirname}/client/public/uploads/${imagePath}`);
      }

      user = new User({
        name: name,
        email: email,
        imagePath: imagePath
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Create jwt payload
      const payload = {
        user: {
          id: user.id,
        }
      };

      // Create jwt
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: config.get('jwtExpirationTime') },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({ token: token });
        }
      );

    } catch (err) {
      console.log(err);
      return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  });

module.exports = router;