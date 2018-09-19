var generateController = require('../../utils/generateController');
var userModel = require('./users.model');
var subaccountModel = require('../subaccounts/subaccounts.model');
var request = require('request-promise');
var getSecretKey = require('../../utils/getSecretKey');
var getUrl = require('../../utils/getUrl');
//overriding the getOne generate controller function with a function that will be 
//called upon verification of account from email link
module.exports = generateController(userModel,{
        verifyOneEmail: function (req, res, next) {
            const tokenExpiryDate = req.decoded.exp;
            console.log(tokenExpiryDate,Date.now())
            console.log(tokenExpiryDate - Date.now())
//            if(tokenExpiryDate < Date.now()) return res.json({title:'failed',message:'your link has expired'})
            const _id = req.decoded._id;

            userModel.findById(_id, function (err, user) {
                if(err) return next(err);
                if(user.category === 'personal') user.complete = true;
                              
                user.completed_email_verification = true;

                user.save(function (err, updatedUser) {
                    res.json({message:"your email has been verified"})
                    // res.send('<p>Succesful</p>')
                    //here i will render a page res.render()
                })
            })



            
        },
    coporateRegisteration:function(req,res,next) {
        const _id = req.decoded._id;
//      if(user.complete) return res.sendStatus(403)// forbidden for those who have already completed registeration.
        
        const {
                business_name,account_number,founder,social_platforms,date_of_birth,
            church,coporate_address,other_platforms,settlement_bank
              } = req.body;
        
        const body = {
                        business_name,account_number,founder,social_platforms,percentage_charge,
                        church,coporate_address,other_platforms,settlement_bank
                     };
        const SECRET_KEY = getSecretKey("PAYSTACK_SECRET_KEY");
        const Authorization = 'Bearer ' + SECRET_KEY;
        const options = {
            method: 'POST',
            uri: 'https://api.paystack.co/subaccount',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authorization
            },
            body: body,
            json: true

        }
        request(options)
            .then(function(response){
            
                if(response.message === "Subaccount created") {
                    body.verified_bvn = true;
                    body.date_of_birth = date_of_birth;
                    userModel.findByIdAndUpdate(_id,{$set:body},{new:true},function(err,user){
                        if(err) return next(err);
                        console.log(response)
             
                        const { business_name, settlement_bank, subaccount_code, settlement_schedule, percentage_charge,is_verified,account_number,id,createdAt,updatedAt } = response.data;
                        const userId = _id;
                        const id_from_paystack = id; //This is an id issused by paystack
                        const paystack_created_at = createdAt;
                        const paystack_updated_at = updatedAt;
                        const dataToSave = { userId,business_name, settlement_bank, subaccount_code, settlement_schedule, percentage_charge,is_verified, account_number,id_from_paystack,paystack_created_at,paystack_updated_at }
                        
                        subaccountModel.create(dataToSave, function (err, subaccount) {
                            if (err) return next(err);
                            res.json({title:'success',message:'Thank you, your registeration is successful. We are verifying your credentials, it will take between 24 - 48hrs to get your credentials verified. You will get a success message from us within this period after successful verification'});
                        });                    
                    })         
        }        
        })
        .catch(function(err){
            console.log(err);
            res.json(err)
            
        })
    
        

    },
    getAll:function(req,res,next) {
//         const tokenExpiryDAte = req.decoded.exp;
//         if(tokenExpiryDAte < Date.now()) return res.json({title:'failed',message:'your token has expired'})
            let query = {complete:true,category:'coporate'};        
            userModel.find(query,function(err,users){
                    if(err) return next(err);
                    res.json(users)
            })
                
    },
    
    queryUsers:function(req,res,next) {

        let category = req.query.category;
        let query = {category,created_at:{$gte:req.query.startAt,$lt:req.query.endAt}}
        if(category === 'all') {
            query = {created_at:{$gte:req.query.startAt,$lt:req.query.endAt}}    
        }
        console.log(query)
        console.log("yen yen yen")
        userModel.find(query,function(err,users){
               if(err) return next(err);
                console.log(users)
                    res.json(users)
        })
            
    },
    
    updateOne:function(req,res,next) {
        const _id = req.params.id;
        const body = req.body;
        console.log(body)
        userModel.findByIdAndUpdate(_id,{$set:body},{new:true}, function(err,user){
            if(err) return next(err);
            
            res.json(user)
        })
    }
    
}
);