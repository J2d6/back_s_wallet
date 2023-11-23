var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const signupRouter = require('./routes/signup')
const userRouter = require("./routes/users")
const adminRouter = require('./routes/admin')
const cpRouter = require('./routes/cashPoint')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/s_wallet.v1/auth', authRouter);
app.use('/api/s_wallet.v1/signup', signupRouter);
app.use('/api/s_wallet.v1/user', userRouter);
app.use('/api/s_wallet.v1/admin', adminRouter);
app.use('/api/s_wallet.v1/cp', cpRouter); 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');

  res.status(err.status || 500 ).json({
    error : err.message
  })
});

module.exports = app;
