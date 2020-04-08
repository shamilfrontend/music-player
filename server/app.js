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

const MONGO_DB_URL_PROD =
  'mongodb://shamilalisultanov:shamilfrontend321@ds016118.mlab.com:16118/music-player-prod'
// const MONGO_DB_URL_DEV =
//  'mongodb://shamilfrontend:shamilfrontend123@ds056559.mlab.com:56559/music-player-dev'
// const MONGO_DB_URL = process.env.MONGO_DB_URL_PROD || MONGO_DB_URL_DEV

// DB connect
mongoose
  .connect(MONGO_DB_URL_PROD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('Database connected!'))
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error))

module.exports = app
