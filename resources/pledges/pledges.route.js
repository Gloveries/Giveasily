const controller = require('./pledges.controller.js');
const express = require('express');
const Verify = require('../../utils/verify');
const Pledges = require('./pledges.model')
const router = express.Router();

router.route('/')
    .post(controller.createOne)
    .get(Verify.verifyOrdinaryUser,controller.getAll)//This 



router.route('/unredeemed')
    .get(Verify.verifyOrdinaryUser,controller.getUnredeemedPledges)//This route returns all the pledges the user hasntredeemed


router.route('/incoming')
    .get(Verify.verifyOrdinaryUser,function(req,res,next){
        const beneficiaryId = req.decoded._id;
        const { startAt, endAt } = req.query;
        const query ={beneficiaryId,created_at:{$gte:startAt,$lt:endAt}}
    
        Pledges.find(query)
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
        const query ={benefactorId,created_at:{$gte:startAt,$lt:endAt}}
    
        Pledges.find(query)
                .populate('beneficiaryId','business_name')
                .exec(function(err,donations){
                if(err) return next(err)
                res.json(donations)
        })
})

module.exports = router;