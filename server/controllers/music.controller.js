const MusicModel = require('../models/music.model')

const getMusics = async (req, res) => {
  try {
    const musics = await MusicModel.find()
    res.status(200).json(musics)
  } catch (e) {
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}

const addMusic = async (req, res) => {
  try {
    const music = new MusicModel({
      name: req.body.name,
      author: req.body.author,
      imageUrl: `/albums${req.file.imageUrl}`,
      musicUrl: `/musics${req.file.musicUrl}`
    })

    await music.save()

    res.status(201).json(music)
  } catch (e) {
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}

const removeMusic = async (req, res) => {
  try {
    await MusicModel.deleteOne({ _id: req.params.id })
    res.json({
      message: 'Удалено'
    })
  } catch (e) {
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}

module.exports = { getMusics, addMusic, removeMusic }
