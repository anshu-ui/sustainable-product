// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Log the raw password before it is hashed
    console.log('REGISTER - Raw password received:', password); 
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('REGISTER - Hashed password generated:', hashedPassword); 

    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully!' });

  } catch (err) {
    console.error('Registration error:', err);
    if (err.code === 11000) {
        return res.status(409).json({ message: 'Username already exists.' });
    }
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Log the raw password received for login
  console.log('LOGIN - Raw password from frontend:', password); 

  const user = await User.findOne({ username });
  if (!user) {
    console.log('User not found.');
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Log the hashed password retrieved from the database
  console.log('LOGIN - Hashed password from database:', user.password); 

  const isMatch = await bcrypt.compare(password, user.password);
  console.log('LOGIN - Password match result:', isMatch);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;