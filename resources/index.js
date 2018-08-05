var express = require('express')
var books = require('./books/books.route');
var users = require('./users/users.route');

var mainRouter  = express.Router();

mainRouter.use('/books', books);
mainRouter.use('/users', users);


module.exports = mainRouter;