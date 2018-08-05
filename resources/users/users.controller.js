var generateController = require('../../utils/generateController');
var userModel = require('./users.model');
//overriding the getOne generate controller function with a function that will be 
//called upon verification of account from email link
module.exports = generateController(userModel,{
        getOne: function (req, res, next) {
            req.params.id = "5b66cf9cd00cda377ca30527";

            userModel.findById(req.params.id, function (err, user) {
                if(err) return next(err);
                if(user.reg_type === 'personal') {
                    user.completed_registeration = true;
                } else {//if it is a company account
                    user.completed_registeration = user.verified_bvn?true:false
                }
                user.save(function (err, updatedUser) {
                    res.send("Thank you. Your registeration has been confirmed")
                })
            })
        }
    }
);