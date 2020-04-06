const Music = require('../models/music.model')

const getAll = async (req, res) => {
  try {
    const musics = await Music.find()
    res.status(200).json(musics)
  } catch (e) {
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}

const getByUserId = async (req, res) => {
  try {
    const musics = await Music.find()
    res.status(200).json(musics)
  } catch (e) {
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}

const create = async (req, res) => {
  try {
    const { name } = req.body

    const music = new Music({
      name
    })

    await music.save()

    res.status(201).json(music)
  } catch (e) {
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}

const remove = async (req, res) => {
  try {
    await Music.deleteOne({
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

module.exports = { getAll, getByUserId, create, remove }
