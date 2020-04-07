const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// init app
const app = express()

// http body settings
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))

// routes
const userRoutes = require('./routes/user.routes')
const musicRoutes = require('./routes/music.routes')

// router init
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/music', musicRoutes)

// DB connect
mongoose
  .connect(
    'mongodb://shamilfrontend:shamilfrontend123@ds046677.mlab.com:46677/music-vue',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  // eslint-disable-next-line no-console
  .then(() => console.log('Database connected!'))
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error))

module.exports = app
