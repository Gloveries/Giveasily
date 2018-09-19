const controller = require('./donations.controller.js');
const express = require('express');
const Verify = require('../../utils/verify')
const router = express.Router();
const request = require('request-promise');
const getSecretKey = require('../../getSecretKey');
const getUrl = require('../../utils/getUrl')
const Donations = require('./donations.model')
router.route('/')
    .get(Verify.verifyOrdinaryUser,controller.getAll)//This route will later be modified to only allow global_admins access.

router.route('/incoming')
    .get(Verify.verifyOrdinaryUser,function(req,res,next){
        const beneficiaryId = req.decoded._id;
        const { startAt, endAt } = req.query;
        const query ={beneficiaryId,paystack_paid_at:{$gte:startAt,$lt:endAt}}
    
        Donations.find(query)
                .populate('benefactorId','business_name first_name last_name')
                .exec(function(err, donations) {
                if(err) return next(err);
                res.json(donations);
        })
                
                
});

router.route('/outgoing')
    .get(Verify.verifyOrdinaryUser,function(req,res,next){
    console.log(req.query)
        const benefactorId = req.decoded._id;
        const { startAt, endAt } = req.query;
        const query ={benefactorId,paystack_paid_at:{$gte:startAt,$lt:endAt}}
    
        Donations.find(query)
                .populate('beneficiaryId','business_name')
                .exec(function(err,donations){
                if(err) return next(err)
                res.json(donations)
        })
})


router.route('/verify/:reference') //I will need to add 
    .get(Verify.verifyOrdinaryUser,function(req,res,next) {
        const SECRET_KEY = getSecretKey("PAYSTACK_SECRET_KEY");
        const Authorization = 'Bearer ' + SECRET_KEY;
        const uri = getUrl('verify_transaction')+ "/" +req.params.reference
        const options = {
            method: 'GET',
            uri: uri,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authorization
            },
            json: true

        }
        
        request(options)
            .then(function(response){
  
            const data = response.data;
                
                if((data.status = 'success') && response.message === "Verification successful") {
                        
                    res.json({title:'success', message:'Payment verified. Thank you!'})
                }
                
            })
            .catch(function(err){
                res.json({title:'failed',message:'failed to verify'});
                console.log(err)
            })
    })





module.exports = router;