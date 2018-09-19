const express = require('express');
const router = express.Router();
const authControllerGenerator = require('../../utils/authenticationController');
const controller = require('./users.controller');
var user = require('./users.model');
const authController = authControllerGenerator(user);
const Verify = require('../../utils/verify')
// const generalController = generalController(user)

router.route('/')
    .delete(controller.deleteAll)
    .get(Verify.verifyOrdinaryUser,controller.getAll)

router.route('/user_query')
    .get(Verify.verifyGlobalAdminUser,controller.queryUsers)  //the order in which this routes are placed matter


router.route('/:id') //only global admin will have access to this route.
    .put(controller.updateOne)
    .delete(controller.deleteOne)
    .get(Verify.verifyOrdinaryUser,controller.getOne);


router.route('/register')
    .post(authController.register);

router.route('/login')
    .post(authController.login);

router.route('/verify_email/:token')//here all users verify theri email
    .get(Verify.verifyUserEmail,controller.verifyOneEmail)
router.route('/coporate/complete_reg')
    .post(Verify.verifyOrdinaryUser,controller.coporateRegisteration)//post from coporate users' kyc



// router.route('/login')
//     .post(controller.login)
module.exports = router;

