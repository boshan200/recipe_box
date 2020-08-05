var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing', { title: 'Welcome to recipe tutorial!!' });
});

//註冊表單
router.get('/register', (req, res, next)=>{
  res.render('register', { title: 'Sign UP' });
});


module.exports = router;
