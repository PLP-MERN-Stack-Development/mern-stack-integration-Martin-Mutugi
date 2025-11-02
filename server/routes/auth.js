// server/routes/auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash });
    res.status(201).json({ success: true, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.verifyPassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ success: true, token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

module.exports = router;
