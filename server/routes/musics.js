const express = require('express');
const router = express.Router();

const controller = require('../controllers/musics');

router.get('/', controller.getMusics);
router.post('/', controller.addMusics);

module.exports = router;
