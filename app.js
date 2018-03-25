var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var busboy = require('connect-busboy');
var api = require('./server/routes/api');
var app = express();
app.use(logger('dev'));
app.use(busboy({ immediate: true }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api', api);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
// render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
