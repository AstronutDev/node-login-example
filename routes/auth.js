const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

const passport = require('passport')

router.post('/register', async (req, res, next) => {
    let {name, username, password} = req.body

    //simple validate
    if (!name || !username || !password) {
        return res.render('register', { message : 'please try again'})
    }

    const passwordHash = bcrypt.hashSync(password, 10)


    const user = new User({
        name,
        username,
        password: passwordHash
    })
    await user.save()
    return res.render('login')
})

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login', // กำหนด ถ้า login fail จะ redirect ไป /login
      // ถ้า success จะไป /
    }),
    async (req, res) => {
      const { username, password } = req.body
      res.redirect('/')
      // When use passport no need this anymore!
      // // simple validation
      // if (!username || !password) {
      //   return res.render('register', { message: 'Please try again' });
      // }
      // const user = await User.findOne({
      //   username
      // });
      // if (user) {
      //   const isCorrect = bcrypt.compareSync(password, user.password);
      //   if (isCorrect) {
      //     return res.render('index', { user });
      //   } else {
      //     return res.render('login', {
      //       message: 'Username or Password incorrect'
      //     });
      //   }
      // } else {
      //   return res.render('login', { message: 'Username does not exist.' });
      // }
    }
  )

  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

module.exports = router