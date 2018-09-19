var express = require('express');
var router  = express.Router();

var controller = require('./subaccounts.controller');


router.route('/')
    .post(controller.createOne)
    .get(Verify.verifyOrdinaryUser,controller.getAll);

router.route('/:id')
    .delete(controller.deleteOne)
    .put(controller.updateOne)
    .get(controller.getOne);

module.exports = router;