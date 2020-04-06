const { Router } = require('express')
const {
  getAll,
  getByUserId,
  create,
  remove
} = require('../controllers/music.controller')

const router = Router()

router.get('/', getAll)
router.get('/:id', getByUserId)
router.post('/', create)
router.delete('/:id', remove)

module.exports = router
