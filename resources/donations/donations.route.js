const controller = require('./donations.controller.js');
const express = require('express');
const Verify = require('../../utils/verify')
const router = express.Router();

router.route('/')
    .post(Verify.verifyOrdinaryUser,controller.createOne)





module.exports = router;