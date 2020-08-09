var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('landing', { title: 'Welcome to recipe tutorial!!' });
});

//註冊表單
router.get('/register', (req, res, next)=>{
  res.render('register', { title: 'Sign UP' });
});

router.get('/login', (req, res, next)=>{
  res.render('login', { title: '登入' });
});


module.exports = router;
