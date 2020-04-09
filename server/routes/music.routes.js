const { Router } = require('express')
const {
  getMusics,
  addMusic,
  removeMusic
} = require('../controllers/music.controller')
const uploadMusic = require('../middleware/upload-music')
// const uploadImage = require('../middleware/upload-image')

const router = Router()

router.get('/', getMusics)
router.post('/', uploadMusic.single('music'), addMusic)
router.delete('/:id', removeMusic)

module.exports = router
