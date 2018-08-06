const express = require('express')
const books = require('./books/books.route');
const users = require('./users/users.route');
const donations = require('./donations/donations.route');
const pledges = require('./pledges/pledges.route') 


var mainRouter  = express.Router();

mainRouter.use('/books', books);
mainRouter.use('/users', users);
mainRouter.use('/donations',donations)
mainRouter.use('/pledges',pledges)



module.exports = mainRouter;