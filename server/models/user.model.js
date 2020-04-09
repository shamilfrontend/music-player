const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  musics: [
    {
      type: Schema.Types.ObjectId,
      ref: 'musics'
    }
  ]
})

module.exports = model('User', userSchema)
