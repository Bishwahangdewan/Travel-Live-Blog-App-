const express = require('express');
const router = express.Router();
const moment = require('moment');
const multer = require('multer');

//import modals
const Blog = require('../../modals/Blog.js');

//multer setup
const storage = multer.diskStorage({
  destination: function(req, file, cb){
     cb(null, 'public/uploads');
  },
  filename: function(req, file, cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' +         file.originalname.split('.')[file.originalname.split('.').length -1])
  }
})

const upload = multer({ storage : storage});

//get the admin login page
router.get('/admin', (req, res) => {
  res.render('adminLogin');
})

//handle LOGIN
router.post('/admin/login', (req, res) => {
  if (req.body.password === 'password') {
    //login success
    req.session.admin = true;
    req.flash('message', 'Admin Login Successfull');
    res.redirect('/admin/dashboard');
  } else {
    //login failed
    req.flash('message', 'Oops! You have entered the wrong password. Please enter the correct password.');
    res.redirect('/admin');
  }
})

//handle Logout
router.get('/admin/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  })
})


//get the dashboard page
router.get('/admin/dashboard', (req, res) => {
  if(req.session.admin) {
    //get all posts
    Blog.find({})
      .then((data) => {
        console.log(data)
        res.render('dashboard', { posts: data });
    })
    .catch((err) => console.log(err));
  } else {
    req.flash('message', 'Please login first');
    res.redirect('/admin');
  }
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
router.post('/admin/createPost', upload.single('blogImg'), (req, res) => {
  //creating the instance of the model
  const newBlogPost = new Blog({
    title : req.body.title,
    article : req.body.article,
    description: req.body.description,
    image : req.file.filename,
  });
  //saving in the databse
  newBlogPost.save()
    .then(() => {
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
    data.description = req.body.description;
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
