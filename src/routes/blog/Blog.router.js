const express = require('express');
const router = express.Router();

//Route: Root : HomePage
router.get('/', (req, res) => {
  res.render('home');
})

//Route: /blog : BlogPage
router.get('/blog', (req, res) => {
  res.render('blogs');
})

//Route: /blog/:id : ArticlePage
router.get('/blog/:id', (req, res) => {
  res.render('article');
})

module.exports = router;
