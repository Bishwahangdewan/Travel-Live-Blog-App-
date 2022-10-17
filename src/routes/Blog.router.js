const express = require('express');
const router = express.Router();

//Route: Root:HomePage
router.get('/', (req, res) => {
  res.render('home');
})

//Route: /blogs:BlogPage
router.get('/blogs', (req, res) => {
  res.render('blogs');
})

module.exports = router;
