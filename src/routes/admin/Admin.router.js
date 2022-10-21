const express = require('express');
const router = express.Router();

//import modals
const Blog = require('../../modals/Blog.js');

//get the admin login page
router.get('/admin', (req, res) => {
  res.render('adminLogin');
})

//get the dashboard page
router.get('/admin/dashboard', (req, res) => {

  //get all posts
  Blog.find({})
    .then((data) => {
      res.render('dashboard', { posts: data });
    })
    .catch((err) => console.log(err));
})

//get the create post page
router.get('/admin/createPost', (req,res) => {
  res.render('createPost');
})

//test flash msg
router.get('/admin/flash', (req, res) => {
  res.send(req.flash('message'));
})

//add a POST
router.post('/admin/createPost', (req, res) => {
  const blogTitle = req.body.title;
  const blogArticle = req.body.article;

  //creating the instance of the model
  const newBlogPost = new Blog({
    title : blogTitle,
    article : blogArticle,
  });

  //saving in the databse
  newBlogPost.save()
    .then(() => {
      console.log("Blog Post added to the database");
      req.flash('message', 'Blog Post added to the database')
      res.redirect('/admin/dashboard');
    })
    .catch((err) => console.log(err));

})

//get the edit post page
router.get('/admin/editPost/:id', (req,res) => {

  //get post based on id
  Blog.findOne({
    _id : req.params.id,
  }).then((data) => {
    res.render('editPost', { post: data });
  })
})

//edit a post
router.put('/admin/editPost/:id', (req, res) => {
  //find the blog post and update it
  Blog.findOne({
    _id : req.params.id,
  })
  .then((data) => {
    data.title = req.body.title;
    data.article = req.body.article;

    //save the updated data
    data.save()
      .then((savedData) => {
        req.flash('message', 'Your post has been updated successfully');
        res.redirect('/admin/dashboard');
      })
  })
})

//delete a post
router.delete('/admin/deletePost/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => {
      req.flash('message', 'Your post has been deleted successfully');
      res.redirect('/admin/dashboard');
    })
    .catch((err) => console.log(err));
})


module.exports = router;
