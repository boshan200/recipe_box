var express = require('express');
var router = express.Router();

//所有食譜的列表
router.get('/', (req, res, next)=>{
    res.render('recipes/index', { title: 'AllRecipes' });
});

//獲取特定食譜資訊
router.get('/id', (req, res, next)=>{
    res.render("recipes/detail", { title: 'RecipeDetail' });
});

//增加新食譜的表單
router.get('/new', (req, res, next)=>{
    res.render("recipes/new", { title: 'New Recipe' });
});

module.exports = router;

