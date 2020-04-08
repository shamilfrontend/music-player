const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const User = require('../models/user.model')

const jwtSecret = process.env.JWT_SECRET_KEY || 'shamil-music'

const getAll = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}

const login = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорретные данные при входе в систему'
      })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: 'Пользователь не найден'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Неверный пароль попробуйте снова' })
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: '1h'
    })

    res.json({
      userId: user.id,
      token
    })
  } catch (e) {
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}

const create = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорретные данные при регистрации'
      })
    }

    const { email, password, name, phone, role } = req.body

    const candidate = await User.findOne({
      email
    })

    if (candidate) {
      return res.status(400).json({
        message: 'Такой пользователь уже существует'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      role
    })

    await user.save()

    res.status(201).json(user)
  } catch (e) {
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}

const remove = async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.id
    })
    res.json({
      message: 'Успешно удалено'
    })
  } catch (e) {
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}

module.exports = { getAll, login, create, remove }
