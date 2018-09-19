const passport = require('passport')
const Verify = require('./verify')
const sendMail = require('./mailer/mailer')
const cron = require('node-cron')


module.exports = function (User) {
    return {
        login: function (req, res, next) {
            passport.authenticate('local', function (err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(401).json({
                        err: info
                    });
                }
                if(!user.completed_email_verification) return res.json({message:'please verify your email'});
                
                req.logIn(user, function (err) {
                    if (err) {
                        console.log(err)
                        const message = "Could not log in the user"
                        return res.status(500).json({
                            err,
                            message
                        });
                    }


                    var theUser = {
                        title:'success',username: user.username, _id: user._id, admin: user.admin,
                        email: user.email, completed_registeration: user.complete,
                        email_verified:user.completed_email_verification,category:user.category,
                        global_admin:user.global_admin
                    };
                    var token = Verify.getToken(theUser,3600);
                    theUser.token = token

                    //  res.status(200).json({
                    //      status:'Login Succesful',
                    //      success:true,
                    //      token:token,
                    //      user:user
                    //  });
                    res.json(theUser)
                });
            })(req, res, next);
        },

        register: function (req, res, next) {
            User.register(new User({
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                official_phone: req.body.official_phone,
                date_of_birth: req.body.date_of_birth,
                category: req.body.category, 
                founder: req.body.founder 
            }),
                req.body.password, function (err, user) {
                    if (err) {

                        return next(new Error(err))
                    }
                    if (!user) {
                        console.log("user not saved")
                        return res.json({
                            title:"failed",
                            message: "user not saved" })
                    }
    
                    var theUser = {
                         _id: user._id, 
                        email_verified:user.completed_email_verification,
                    }
                    var token = Verify.getToken(theUser,86400);
                   sendMail(user.email,"Please complete registeration",token)


                    // setTimeout(function(){
                    //     // console.log("happy birthday"+user.username);
                    //     sendMail(user.email,"Please complete registeration",user._id)
                    // },30000)



                    passport.authenticate("local")(req, res, function () {
                        res.json({title:'success' ,email_verified:user.completed_email_verification,email:user.email,message: "registeration succesful" })
                    });
                });
        }
    }

}