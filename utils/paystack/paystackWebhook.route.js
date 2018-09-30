const express = require('express');
const router = express.Router();
const request = require('request-promise');
const getSecretKey = require('../../getSecretKey');
const Users = require('../../resources/users/users.model');
const Verify = require('../verify')
const bodyParser = require('body-parser');
const crypto = require('crypto');
const secret = getSecretKey("PAYSTACK_SECRET_KEY");
const Donations = require('../../resources/donations/donations.model');
const Pledges = require('../../resources/pledges/pledges.model')



router.route('/')
    .post(function (req, res, next) {
    var hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    var type; //This will hold the type either 'donate' or 'pledge'
    console.log('in the post route to be called by paystack')
    console.log(req.body)
    if (hash == req.headers['x-paystack-signature']) {
        res.sendStatus(200)
        if(req.body.event === 'charge.success') {
            if(req.body.data.status === 'success') {
                
                const data = req.body.data;
                const metadata = data.metadata;
                type = (metadata.custom_fields[0]).type; //if type is 'pledge', then it means this is triggered by a user trying to redeem his pledge
                console.log(type)
                var donationData;
                const platform = (metadata.custom_fields[0]).platform//we need this to check if the user is donating from their dashboard or if the user is donating from another means where we cant track their metadata e.g if they are donating via a form.
                
                let {reference,amount,channel, currency, created_at, paid_at, ip_address} = data;
                amount = Number(amount) / 100
                const {referrer} = metadata;
                const {bank,brand} = data.authorization;
                //assign values for created_at field with the model key paystack_created_at soa s not to be confused with 
                //mongoose generated 'created_at field
                const paystack_created_at = created_at;
                const paystack_paid_at = paid_at;

                donationData= {reference,amount,channel,currency,referrer,bank,brand,ip_address,paystack_paid_at,paystack_created_at}

                if(platform === 'dashboard') {
                    var { purpose,beneficiaryId,benefactorId,description } = metadata.custom_fields[0];
                    
                    donationData.purpose = purpose;
                    donationData.benefactorId = benefactorId;
                    donationData.beneficiaryId = beneficiaryId;
                    donationData.description = description;
                    
                    
                }
                
                
                Donations.create(donationData, function(err, donation) {
                    if(err) return next(err);
                    const _id = donation.benefactorId;
                    const donationId = donation._id;
                    Users.findById(_id, function(err,user) {
                        if(err) return next(err);
                        
                        user.authorization.push(data.authorization);
                        user.save(function(err,newUser){
                            if(err) return next(err);
                                
                            if(type === 'pledge')  {
                                const pledgeId = (metadata.custom_fields[0]).pledgeId; //The id of the pledge document
                                const pledge_redeemed_at = (new Date()).toString();
                                const status = 'redeemed';
                                console.log(pledgeId)
                                Pledges.findByIdAndUpdate(pledgeId,{$set:{donationId,pledge_redeemed_at,status}},{new:true}, function(err, pledges){
                                    if(err) return next(err);
                                    
                                    
                                })
                            }

                        })
                    })
                })
                
                

            }
        }
        
    }
  

})

.get(function(req,res,next){
    res.json({title:'success',payload:'done_things'})
})


module.exports = router;