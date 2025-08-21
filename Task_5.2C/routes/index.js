const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

module.exports = router;