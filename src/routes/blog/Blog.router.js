const express = require('express');
const router = express.Router();

//import modals
const Blog = require('../../modals/Blog.js')

//Route: Root : HomePage
router.get('/', (req, res) => {
  Blog.find({})
    .sort({ createdAt: 'desc' })
    .then((data) => {
      const mostPopular = data.slice(0,3);
      //get random Blog
      const random = Math.floor(Math.random() * data.length);
      const showcaseData = data[random];
      const latestData = data[0];

      res.render('home',{
        mostPopular: mostPopular,
        showcaseData: showcaseData,
        latestData: latestData,
      });
    })
})

//Route: /blog : BlogPage
router.get('/blog', (req, res) => {
  Blog.find({})
    .sort({ createdAt: 'desc' })
    .then((data) => {
      res.render('blogs', { posts: data });
    })
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

//Search query
router.get('/search', (req, res) => {
  console.log(req.query.search);
  Blog.find({
    title : { $regex: req.query.search, $options: "i" },
    description : { $regex: req.query.search, $options: "i" },
  })
  .then((data) => {
    res.render('searchResults', {
      posts: data,
      query: req.query.search, 
    })
  })
})

module.exports = router;
