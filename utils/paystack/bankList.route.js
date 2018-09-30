const express = require('express');
const router = express.Router();
const request = require('request-promise');
const getSecretKey = require('../../getSecretKey');
const Users = require('../../resources/users/users.model');
const Verify = require('../verify')

router.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {

        const SECRET_KEY = getSecretKey("PAYSTACK_SECRET_KEY");
        const Authorization = 'Bearer ' + SECRET_KEY;
        const options = {
            method: 'GET',
            uri: 'https://api.paystack.co/bank',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authorization
            },
            json: true

        }
        request(options)
            .then(function (response) {
                // if(response.message === 'Subaccount created') {
                if (response.status === true && response.message === "Banks retrieved") {
                    const data = response.data;
                    res.json(data);
                }
            })
            .catch(function (error) {
                return next(new Error(error));
            })
    })

module.exports = router;