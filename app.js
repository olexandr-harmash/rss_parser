let createError = require('http-errors');
let path = require('path');

require('dotenv').config({
  path: path.join(__dirname, process.env.NODE_ENV + '.env'),
});

require('./models/db');
require('./config/passport');

let express = require('express');

let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./controllers/index');

let app = express();
const cors = require('cors');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/', indexRouter);

const response = require('./config/response');
const Err = require('./config/errors');

app.use(function (err, req, res, next) {
    const error = Err.checkApiError(err);

    response.sendJSONresponse(res, error.statusCode, {
      message: error.message,
    });
  }
);
require('./rss');
module.exports = app;
