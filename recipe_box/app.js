var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var session = require('express-session'),
    User = require("./models/user");


//database setting
var url = process.env.DBURL || 'mongodb://localhost/recipe_box';
mongoose.connect(url, {
  useNewUrlParser: true})
  .then(()=>{
    console.log('Connected to DB!!');
  }).catch(err => {
    console.log('ERROR:', err.message);
  });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var recipeRouter = require('./routes/recipe');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipes', recipeRouter);

//passport settings
//下面這段用意在加裝session設定並希望透過session自動保留登入的資料
app.use(session({
  secret: 'boshan200',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

//設定passport的認證策略,可在此新增使用者驗證身分的方法，ex:google、fb的帳號登入
passport.use(new LocalStrategy(User.authenticate()));

//將使用者的登入資料序列化，使的我們可以用userid來存取使用者資料，替session省去多餘負擔

passport.serializeUser(
//簡化寫法"User.serializeUser()"由passportLocalmongoose提供
//   (user, done)=>{
//     done(null, user._id);
// }
User.serializeUser()
);
passport.deserializeUser(
//簡化寫法"User.deserializeUser()"由passportLocalmongoose提供
// async (id, done)=> {
//   const user = await User.findById(id, (err, user)=>{
//     done()
//   });
// }
User.deserializeUser()
);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
