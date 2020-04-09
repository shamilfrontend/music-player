const { Schema, model } = require('mongoose')

const musicSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  musicUrl: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Неизвестный'
  },
  imageUrl: {
    type: String,
    default: '/static/icon.png'
  },
  date: {
    type: Date,
    default: Date.now
  },
  numberOfPlays: {
    type: Number,
    default: 0
  }
})

module.exports = model('Music', musicSchema)
