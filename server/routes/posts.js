// server/routes/posts.js

const express = require('express');
const router = express.Router();

// Dummy route for testing
router.get('/', (req, res) => {
  res.json({ message: 'Posts route is working!' });
});

module.exports = router;
