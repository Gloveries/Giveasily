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
    var query = {
        user:req.decoded._id,
        sent_order:false
    }
    if(req.decoded.admin) {
        Orders.find({}, function(err,order){
        if(err) return next(err);
          return res.json(order);

    });
    }
    Orders.find(query, function(err,order){
        if(err) return next(err);
        res.json(order);

    });

})


.post(Verify.verifyOrdinaryUser,function(req,res,next) {
    req.body.user = req.decoded._id;
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
.put(Verify.verifyAdminUser,function(req,res,next){
    Orders.findById(req.params.orderId, function(err,order){
        if(err) return next(err);
        if(req.body.sent_order){
            order.sent_order = req.body.sent_order;
        }
        if(req.body.payment_confirm) {
            order.payment_confirm = req.body.payment_confirm;
        }
        order.save(function(err,savedOrder) {
            if(err) return next(err);

            res.json(savedOrder);
        })
    });

})

.delete(Verify.verifyAdminUser,function(req,res,next) {
    Orders.findByIdAndRemove(req.params.orderId, function(err, resp){
        if(err) return next(err);
        res.json(resp);
    });
});


module.exports = orderRouter;
