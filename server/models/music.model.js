const { Schema, model } = require('mongoose')

const musicSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = model('Music', musicSchema)
