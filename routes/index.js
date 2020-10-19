var express = require('express');
var router = express.Router();
let passport = require('passport')

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    return res.redirect('/login')
  }
}


/* GET home page. */
router.get('/', isLoggedIn,  function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/register',  (req, res, next) => {
  res.render('register')
})

router.get('/login', (req, res, next) => {
  res.render('login') 
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

module.exports = router;
