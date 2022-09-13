let createError = require('http-errors');
let path = require('path');
//var passport = require('passport');

require('dotenv').config({path: path.join(__dirname, process.env.NODE_ENV+'.env')})

require('./models/db')
require('./config/passport');

let express = require('express');

let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./controllers/index');

let app = express();
var cors = require('cors')
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/api/v1/', indexRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

var response = require('./config/response')
var Err = require('./config/errors')
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('traking')
  if (err) {
    console.log(err)
    const error = Err.checkApiError(err)
    console.log(error)
    response.sendJSONresponse(res, error.statusCode, {
      "message": error.message
    })
  }

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});
require('./rss')
module.exports = app;
