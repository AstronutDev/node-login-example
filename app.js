var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth' )

const passport = require('passport');
const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcrypt')

passport.use(new LocalStrategy((username, password, callback) => {
  //logic - ย้ายจากตัว auth login 
  let user = User.findOne({
    username
  },
    //ท่า callback ของ mongoose
   (err, user )=> {
    //ถ้า error
    if(err) {
      return callback(err)
    } 

    //ถ้าไม่มี user
    if (!user) {
      return callback(null, false)
    }

    //กรณีเจอ user
    if (bcrypt.compareSync(password, user.password)) {
        return callback(null, user)
    }

    return callback(null, false)
    
  })
}))

passport.serializeUser((user, cb) => {
  cb(null, user._id)
})
passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err)
    }
    cb(null, user)
  })
})


var app = express();

require('./db')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'supernova',
  resave: false,
  saveUninitialized: false
}))


app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);




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
