const { Router } = require('express')
const { check } = require('express-validator')
const {
  getAll,
  create,
  login,
  remove
} = require('../controllers/user.controller')

const router = Router()

const createUserValidators = [
  check('email', 'Некорректный email').isEmail(),
  check('password', 'Минимальная длина пароля 6 символов').isLength({
    min: 6
  })
]

const loginValidators = [
  check('email', 'Введите корректный email')
    .normalizeEmail()
    .isEmail(),
  check('password', 'Введите пароль').exists()
]

router.get('/', getAll)
router.post('/create', createUserValidators, create)
router.post('/login', loginValidators, login)
router.delete('/:id', remove)

module.exports = router
