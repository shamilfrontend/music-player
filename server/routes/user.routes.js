const { Router } = require('express')
const { check } = require('express-validator')
const { getUsers, signIn, signUp } = require('../controllers/user.controller')

const router = Router()

const signInValidators = [
  check('email', 'Введите корректный email')
    .normalizeEmail()
    .isEmail(),
  check('password', 'Введите пароль').exists()
]

const signUpValidators = [
  check('email', 'Некорректный email').isEmail(),
  check('password', 'Минимальная длина пароля 6 символов').isLength({
    min: 6
  })
]

router.get('/', getUsers)
router.post('/signup', signUpValidators, signUp)
router.post('/signin', signInValidators, signIn)

module.exports = router
