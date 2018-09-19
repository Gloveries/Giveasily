const express = require('express');
const router = express.Router();
const request = require('request-promise');
const getSecretKey = require('../../getSecretKey');
const Users = require('../../resources/users/users.model');
const Verify = require('../verify')
router.route('/:bvn')
    .get(Verify.verifyOrdinaryUser,function (req, res, next) {
        const emailVerified = req.decoded.email_verified;
        if(!emailVerified) return res.sendStatus(403) //forbidden to access this route if email is not verified
        const bvn = req.params.bvn;
        const SECRET_KEY = getSecretKey("PAYSTACK_SECRET_KEY");
        const Authorization = 'Bearer ' + SECRET_KEY;
        const options = {
            method: 'GET',
            uri: `https://api.paystack.co/bank/resolve_bvn/${bvn}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authorization
            },
            json: true

        }

        request(options)
            .then(function (response) {
                const { data: { first_name, last_name, formatted_dob, mobile, bvn }, message,status } = response;
                //formatted_dob-->the format is YYYY-MM-DD
                if(response.status !== true) return res.json({
                    title:'failed',
                    message:'This may not be a valid bvn'
                })
                const _id = req.decoded._id;

                Users.findByIdAndUpdate(_id, { $set:  { verified_bvn: true,complete:true  } }, { new: true }, function (err, user) {
                    if (err) return next(err);
                    const verified_bvn = user.verify_bvn;
                    res.json({message,status,first_name,last_name,formatted_dob,bvn,mobile,verified_bvn});
                })
            })
            .catch(function (err) {
                res.json({
                    title:'failed',
                    message: 'cannot resolve this bvn',
                    err: err
                })
            })
    });

module.exports = router;