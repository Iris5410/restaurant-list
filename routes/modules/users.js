const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/users')
const Restaurant = require('../../models/restaurants')

router.get('/login', (req, res) => {
  res.render('login')
})

// 登入
router.post('/login', passport.authenticate('local', {
  failureRedirect: 'users/login',
  successRedirect: '/'
}))

// 註冊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!email || !password || !confirmPassword) {
    errors.push({ message: '尚未填寫齊全。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符。' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
})

router.get('/register', (req, res) => {
  res.render('register')
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出！')
  res.redirect('/users/login')
})

module.exports = router