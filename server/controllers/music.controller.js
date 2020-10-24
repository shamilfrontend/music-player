const MusicModel = require('../models/music.model')

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

const getTopTenMusics = async (req, res) => {
  try {
    const musics = await MusicModel.find()
    res.status(200).json(musics)
  } catch (e) {
    res.status(500).json({
      message: 'Что-то пошло не так'
    })
  }
}

const addListening = async (req, res) => {
  const $set = {
    listening: ++req.body.listening
  }

  try {
    await MusicModel.findOneAndUpdate(
      {
        _id: req.params.id
      },
      { $set }
    )
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
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

module.exports = {
  addMusic,
  getMusics,
  getTopTenMusics,
  addListening,
  removeMusic
}
