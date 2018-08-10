const express = require('express');
const router = express.Router();
const request = require('request-promise');
const getSecretKey = require('../getSecretKey');

router.route('/:bvn')
    .get(function(req,res,next){
        console.log("in the get route")
        const bvn = req.params.bvn;
        const SECRET_KEY = getSecretKey("PAYSTACK_SECRET_KEY");
        const Authorization = 'Bearer '+SECRET_KEY;
        const options = {
            method:'GET',
            uri:`https://api.paystack.co/bank/resolve_bvn/${bvn}`,
            headers: {
                'Content-Type':'application/json',
                'Authorization': Authorization
            },
            json:true
            
        }

        request(options)
        .then(function(response){
            const {data:{first_name,last_name,dob,mobile,bvn,status},message} = response;
            res.json({
                message,
                status,
                first_name,
                last_name,
                dob,
                bvn,
                mobile
            })
            res.json(response)
        })
        .catch(function(err){
            res.json({
                message:'cannot resolve this bvn',
                err:err
             })
        })
    });

module.exports = router;