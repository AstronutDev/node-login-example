const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

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

router.post('/login',async (req, res ,next) => {

    let { username, password } = req.body
    const user = await User.findOne({
            username
    })
        if (user) {
            const isCorrect = bcrypt.compareSync(password, user.password)
            if (isCorrect) {
                req.session.user = user
                return res.redirect('/')
            } else {
                res.render('login', { message: 'username of password is not correct'})
            }
        } else {
            return res.render('login', {message: 'user not found'})
        }
})

module.exports = router