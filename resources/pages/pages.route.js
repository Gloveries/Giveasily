const express = require('express');
const Verify = require('../../utils/verify')
const router = express.Router();
const controller = require('./pages.controller');


router.route('/')
    .post(Verify.verifyOrdinaryUser,controller.createOne)
    .get(Verify.verifyOrdinaryUser,controller.getPagesForOne) //gets all pages for one user

router.route('/:pageId/:slug')
    .get(Verify.verifyOrdinaryUser,controller.getOne)
    .put(Verify.verifyOrdinaryUser,controller.updateOne)

module.exports = router;