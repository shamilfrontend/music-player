const path = require('path')
const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.resolve(__dirname, '../../', 'static/musics'))
  },
  filename(req, file, callback) {
    callback(
      null,
      `${moment().format('DDMMYYYY-HHmmss_SSS')}-${file.originalname}`
    )
  }
})

const fileFilter = (req, file, callback) => {
  const MIME_TYPES = [
    'audio/mpeg3',
    'audio/x-mpeg-3',
    'video/mpeg',
    'video/x-mpeg'
  ]

  if (MIME_TYPES.includes(file.mimetype)) {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 100
  }
})
