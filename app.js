var express = require('express');
var app = express();
var db = require('./db');
var middleware = require('./middleware');
var resources = require('./resources');
var path = require('path');



db();
middleware(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));


app.use(resources);

// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: err
//   });
// });


module.exports = app;
