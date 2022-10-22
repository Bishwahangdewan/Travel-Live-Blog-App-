const express = require('express');
const router = express.Router();

//import modals
const Blog = require('../../modals/Blog.js')

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
  //find single posts
  Blog.findOne({
    _id : req.params.id
  })
  .then((data) => {
    res.render('article',{ post : data });
  })
})

module.exports = router;
