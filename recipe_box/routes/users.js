var express = require('express');
var router = express.Router();

//獲取特定使用者資料
router.get('/id', function(req, res, next) {
  res.render('user/index', { title: 'User Profile' });
});

//修改使用者資料表單


module.exports = router;
