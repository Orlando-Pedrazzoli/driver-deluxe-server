const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

router.post('/signup', async (req, res, next) => {
  const { email, password, name, license } = req.body;

  try {
    if (email === '' || password === '' || name === '' || license === '') {
      return res.status(400).json({ message: 'All the fields are mandatory' });
    }

    // use regex to validate the email format:
    const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Provide a valid email adress' });
    }

    // validating the password:
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password needs at least 6 charactersand contain one number, one lowercase, one uppercase, and a special character',
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    // Encrypt the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create new user:
    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
      license,
    });

    res.json({
      email: newUser.email,
      name: newUser.name,
      _id: newUser._id,
      license: newUser.license,
    });
  } catch (error) {
    console.log('Error creating the user', error);
    next(error);
  }
});

module.exports = router;
