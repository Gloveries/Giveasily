const express = require('express')
const books = require('./books/books.route');
const users = require('./users/users.route');
const donations = require('./donations/donations.route');
const pledges = require('./pledges/pledges.route') ;
const verify_bvn = require('../utils/verify/verifyBvn.route')


var mainRouter  = express.Router();

mainRouter.use('/books', books);
mainRouter.use('/users', users);
mainRouter.use('/api/v1/donations',donations)
mainRouter.use('/api/v1/pledges',pledges)
mainRouter.use('/api/v1/verify_bvn',verify_bvn)




module.exports = mainRouter;