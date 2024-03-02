const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require('../middleware/jwt.middleware');

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

    const licenseRegex = /\d{6}\/\d{4}/;

    if (!licenseRegex.test(license)) {
      return res
        .status(400)
        .json({ message: 'Provide a valid license number' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    // Encrypt the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Adding cart data:
    let cart = {};
    for (let i = 0; i < 100; i++) {
      cart[i] = 0;
    }
    // Create new user:
    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
      license,
      cartData: cart,
    });

    res.json({
      email: newUser.email,
      name: newUser.name,
      _id: newUser._id,
      license: newUser.license,
      cartData: newUser.cartData,
    });
  } catch (error) {
    console.log('Error creating the user', error);
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (email === '' || password === '') {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Provided email is not registerd.' });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (isPasswordCorrect) {
      // create a payload for the JWT with the user info
      // DO NOT SEND HASHED PASSWORD!!
      const payload = { _id: user._id, email: user.email, name: user.name };

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: 'HS256', // algorithm we wan to encrypt the token with
        expiresIn: '6H', // time to live of the JWT
      });
      res.status(200).json({ authToken });
    } else {
      return res.status(401).json({ message: 'Unable to authenticate user' });
    }
  } catch (error) {
    console.log('An error occured loging in the user', error);
    next(error);
  }
});

router.get('/verify', isAuthenticated, (req, res, next) => {
  // if the jwt is valid, the payload gets decoded by the middleware
  // and is made available in req.payload
  console.log('req.payload', req.payload);

  // send it back with the user data from the token
  res.status(200).json(req.payload);
});

module.exports = router;
