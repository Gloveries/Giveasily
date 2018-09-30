const express = require('express')
const books = require('./books/books.route');
const users = require('./users/users.route');
const donations = require('./donations/donations.route');
const pledges = require('./pledges/pledges.route') ;
const verify_bvn = require('../utils/paystack/verifyBvn.route');
const subaccount = require('../utils/paystack/create_subaccount.route')
const webhook = require('../utils/paystack/paystackWebhook.route')
const starter = require('../utils/starter');
const pages = require('./pages/pages.route');
const bank = require('../utils/paystack/bankList.route')


var mainRouter  = express.Router();

mainRouter.use('/books', books);
mainRouter.use('/api/v1/users', users);
mainRouter.use('/api/v1/donations',donations)
mainRouter.use('/api/v1/pledges',pledges)
mainRouter.use('/api/v1/bvn',verify_bvn);
mainRouter.use('/api/v1/subaccount',subaccount)
mainRouter.use('/api/v1/webhook',webhook);
mainRouter.use('/api/v1/starter',starter);
mainRouter.use('/api/v1/pages',pages);
mainRouter.use('/api/v1/bank',bank);



module.exports = mainRouter;