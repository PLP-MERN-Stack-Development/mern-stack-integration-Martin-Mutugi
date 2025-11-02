// server/routes/categories.js

const express = require('express');
const router = express.Router();

// Dummy route for testing
router.get('/', (req, res) => {
  res.json({ message: 'Categories route is working!' });
});

module.exports = router;
