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
  listening: {
    type: Number,
    default: 0
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

module.exports = model('musics', musicSchema)
