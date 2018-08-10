const passport = require('passport')
const Verify = require('./verify')
const sendMail = require('./mailer/mailer')


module.exports = function (User) {
   return  {
        login: function (req,res,next) {
              passport.authenticate('local',function(err,user,info) {
         if(err) {
             return next(err);
         }
         if(!user) {
             return res.status(401).json({
                 err:info
             });
         }
         req.logIn(user, function(err) {
             if(err) {
                 const message = "Could not log in the user"
                 return res.status(500).json({
                     err,
                     message
                 });
             }

            //  if(!user.completed_registeration) return res.json({message:"complete your registeration"})
             //console.log('User in users: ', user);
             var theUser = {username:user.username, _id:user._id, admin:user.admin,
             email:user.email,completed_registeration:user.completed_registeration
            };
             var token = Verify.getToken(theUser);
             theUser.token = token

            //  res.status(200).json({
            //      status:'Login Succesful',
            //      success:true,
            //      token:token,
            //      user:user
            //  });
            res.json(theUser)
         });
     })(req,res,next);
        },

        register: function (req,res,next) {
            User.register(new User({
                username: req.body.username,
                firstName: req.body.firstName,
                lastname: req.body.lastname,
                reg_type: req.body.reg_type, // a company or an individual
                email: req.body.email,
                date_of_birth: req.body.date_of_birth,
                registeration:{category:req.body.category,founder:req.body.founder}
            }),
                req.body.password, function (err, user) {
                    if (err) {
                        console.log(err);
                        return res.render('error registering');
                    }
                    if (!user) {
                        console.log("please register as a user first")
                        return res.json({message:"user not saved"})
                    }
                    console.log("i am sending a mail")
                    //sendMail(user.email,"registeration",res,user._id)


                    
                    // passport.authenticate("local")(req, res, function () {
                    //     res.json({ message: "registeration succesful" })
                    // });
                });
        }
    }

}