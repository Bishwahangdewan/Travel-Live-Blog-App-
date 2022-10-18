const express = require('express');
const router = express.Router();

router.get('/admin', (req, res) => {
  res.render('adminLogin');
})

router.get('/admin/dashboard', (req, res) => {
  res.render('dashboard');
})

module.exports = router;
