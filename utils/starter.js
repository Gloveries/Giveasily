const Users = require('../resources/users/users.model');
const Donations = require('../resources/donations/donations.model');
const Pledges = require('../resources/pledges/pledges.model');
const express = require('express');
const asynchronous = require('async');
const Verify = require('./verify');
const mongoose = require('mongoose')
const router = express.Router();
router.route('/')
        .get(Verify.verifyOrdinaryUser,function(req,res,next){
            const id = mongoose.Types.ObjectId(req.decoded._id);//we need to implicitly convert this into type objectId
    //because doing query with $match does not implicityly convert string into object
            const admin = req.decoded._id;
    if(admin){
            asynchronous.parallel(
            {
                donationsCount:function(callback) {
                   Donations.countDocuments({},function(err,count){
                       if(err) return next(err);
                       callback(null,count);
                   });
                    
                    
                },
                donationsAmount:function(callback){
                    Donations.aggregate([
                        {$match:{}},
                        {
                            $group:{
                                _id:null,
                                total:{
                                    $sum:"$amount"   
                                }
                            }
                        }
                    ],function(err,doc){
                        if(err) return next(err);
                        callback(null,doc)
                    })
                },
                pledgesCount:function(callback){
                    Pledges.countDocuments({},function(err,count){
                       if(err) return next(err);
                       callback(null,count);
                   });
                },
               coporateUsersCount:function(callback){
                    Users.countDocuments({},function(err,count){
                       if(err) return next(err);
                       callback(null,count);
                   });
                },
                personalUsersCount:function(callback){
                    Users.countDocuments({benefactorId:id},function(err,count){
                       if(err) return next(err);
                       callback(null,count);
                   });
                }
            },function done(err,results){
                if(err) return next(err);
                res.json(results)
            })
    } 
    
    else{
            asynchronous.parallel(
            {
                donationsCount:function(callback) {
                   Donations.countDocuments({benefactorId:id},function(err,count){
                       if(err) return next(err);
                       callback(null,count);
                   });
                    
                    
                },
                donationsAmount:function(callback){
                    Donations.aggregate([
                        {$match:{benefactorId:id}},
                        {
                            $group:{
                                _id:null,
                                total:{
                                    $sum:"$amount"   
                                }
                            }
                        }
                    ],function(err,doc){
                        if(err) return next(err);
                        callback(null,doc)
                    })
                },
                pledgesCount:function(callback){
                    Pledges.countDocuments({benefactorId:id},function(err,count){
                       if(err) return next(err);
                       callback(null,count);
                   });
                }
            },function done(err,results){
                if(err) return next(err);
                res.json(results)
            })
    }//end else
    
});

router.route('/donations_count')
    .get(Verify.verifyOrdinaryUser,function(req,res,next){
    const id = req.decoded._id;
    const startAt = req.query.startAt;
    const endAt = req.query.endAt;
    const query = (startAt === 'All')? {benefactorId:id} : {benefactorId:id,paystack_created_at:{$gte:startAt,$lt:endAt}}
    

        
        Donations.countDocuments(query,function(err,count){
            if(err) return next(err);
            res.json({count})
        })
    
});

router.route('/donations_amount')
    .get(Verify.verifyOrdinaryUser,function(req,res,next){
    const id = mongoose.Types.ObjectId(req.decoded._id);
    const startAt = req.query.startAt;
    const endAt = req.query.endAt;
    const condition = (startAt === 'All')? {benefactorId:id} : {benefactorId:id,paystack_paid_at:{$gte:startAt,$lt:endAt}}
        Donations.aggregate([
            {$match:condition},
            {
                $group:{
                        _id:null,
                        total:{
                            $sum:"$amount"   
                            }
                        }
            }],function(err,doc){
                        if(err) return next(err);
                        res.json(doc)
                    })
    
});

router.route('/pledges_count')
    .get(Verify.verifyOrdinaryUser,function(req,res,next){
        const id = req.decoded._id;
        const startAt = req.query.startAt;
        const endAt = req.query.endAt;
        const query = (startAt === 'All')? {benefactorId:id} : {benefactorId:id,created_at:{$gte:startAt,$lt:endAt}};
    
        Pledges.countDocuments(query,function(err,count){
            if(err) return next(err);
            res.json({count});
        })
    
})

module.exports = router;