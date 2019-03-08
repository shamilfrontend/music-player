const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// init app
const app = express();

// setting bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// setting cors
app.use(cors());

// setting morgan
app.use(morgan('dev'));

// static
app.use('/static', express.static('static'));

// routes API
const musicsRouter = require('./routes/musics');

app.use('/api/musics', musicsRouter);

// export app
module.exports = app;
