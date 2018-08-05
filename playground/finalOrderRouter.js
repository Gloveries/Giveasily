var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Orders = require('../models/order');
var finalOrders = require('../models/order-final');
var Verify = require('./verify');





var orderRouter = express.Router();
orderRouter.use(bodyParser.json());


orderRouter.route('/')

.get(Verify.verifyOrdinaryUser,function(req,res,next) {
    if(req.decoded.admin) {
        Orders.find({}, function(err,order){
        if(err) return next(err);
          return res.json(order);
    });
    }
    Orders.find({user:req.decoded._id}, function(err,order){
        if(err) return next(err);
        console.log('am not an admin')
        return res.json(order);
    });
})

.put(Verify.verifyAdminUser,function(err,order){

})

.post(function(req,res,next) {
//    req.body.user = req.decoded._id;
    Orders.create(req.body, function(err,order) {
        if(err) return next(err);
        //res.io.emit('new:order',order);
        res.json(order);
    });
});



// .delete(function(req,res,next) {
//     Orders.remove({}, function(err, resp){
//         if(err) throw err;
//         res.json(resp);
//     });
// });

orderRouter.route('/:orderId')

// .get(function(req,res,next){
//     Orders.findById(req.params.orderId, function(err, order) {
//         if (err) next(err);
//         res.json(order);
//     });
// })
.put(function(req,res,next){
    Orders.findById(req.params.orderId, function(err,order){
        if(err) return next(err);
        if(req.body.location!=null) {
            order.location = req.body.location;
        }
        if(req.body.contact_phone!=null) {
            order.contact_phone = req.body.contact_phone;
        } 
        if(req.body.attendant!=null) {
            order.attendant = req.body.attendant;
        }

        finalOrders.create(order, function(err,finalOrder) {
            if(err) return next(err);
            console.log(finalOrder);
            Orders.findByIdAndRemove(req.params.orderId, function(err, resp){
            if(err) return next(err);
            res.json(finalOrder);
    });
            
        });
    });

})

.delete(Verify.verifyAdminUser,function(req,res,next) {
    Orders.findByIdAndRemove(req.params.orderId, function(err, resp){
        if(err) return next(err);
        res.json(resp);
    });
});


module.exports = orderRouter;
