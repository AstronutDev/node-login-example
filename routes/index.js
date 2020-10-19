var express = require('express');
var router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login')
  }
  next()
}

/* GET home page. */
router.get('/', isLoggedIn,  function(req, res, next) {
  res.render('index', { title: 'Express', user: req.session.user });
});

router.get('/register',  (req, res, next) => {
  res.render('register')
})

router.get('/login', (req, res, next) => {
  res.render('login')
})


module.exports = router;
