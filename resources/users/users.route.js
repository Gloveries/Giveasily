const express = require('express');
const router = express.Router();
const user = require('./users.model')
const authControllerGenerator = require('../../utils/authenticationController');
const controller = require('./users.controller');
const authController = authControllerGenerator(user);
// const generalController = generalController(user)

// router.param('id', controller.findByParam);

// router.route('/')
//     .post(controller.createOne)

router.route('/:id')
    .get(controller.getOne)
    .delete(controller.deleteOne)

router.route('/register')
    .post(authController.register);

router.route('/login')
    .post(authController.login)



// router.route('/login')
//     .post(controller.login)
module.exports = router;

