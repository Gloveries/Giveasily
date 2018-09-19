const express = require('express');
const router = express.Router();
const request = require('request-promise');
const getSecretKey = require('../../getSecretKey');
const Users = require('../../resources/users/users.model');
const Verify = require('../verify')

router.route('/')
    .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        console.log(req.decoded)
        const email = req.decoded.email;
        const completed_registeration = req.decoded.completed_registeration;
        const registeration_category = req.decoded.category
        if ((completed_registeration === false) || (registeration_category != 'coperate'))
            return next(new Error(JSON.stringify({
                title: 'failed',
                message: "Please complete registeration",
            })));

        const SECRET_KEY = getSecretKey("PAYSTACK_SECRET_KEY");
        const Authorization = 'Bearer ' + SECRET_KEY;
        const options = {
            method: 'POST',
            uri: 'https://api.paystack.co/subaccount',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authorization
            },
            body: {
                "business_name": req.body.business_name,
                "settlement_bank": req.body.settlement_bank,
                "account_number": req.body.account_number,
                "primary_contact_email": email,
                "settlement_schedule": req.body.settlement_schedule,
                "percentage_charge": req.body.percentage_charge
            },
            json: true

        }
        request(options)
            .then(function (response) {
                // if(response.message === 'Subaccount created') {
                if (response.status === true) {
                    const {
                        data: { business_name, settlement_bank, subaccount_code, settlement_schedule, percentage_charge, },
                        message
                    } = response;
                    const _id = req.decoded._id;
                    Users.findByIdAndUpdate({ _id },
                        { $set: { sub_account: { business_name, settlement_bank, subaccount_code, settlement_schedule, percentage_charge } } }, { new: true }, function (err, user) {

                            if (err) return next(err);
                            res.json({
                                message,
                                business_name
                            })
                        })
                }
            })
            .catch(function (error) {
                return next(new Error(error));
            })
    });

router.route('/:id')//Access this route when a user wants to change his plan
    .put(Verify.verifyOrdinaryUser, function (req, res, next) {
        const _id = req.params.id;
        const subaccount_code = user.subaccount.subaccount_code;
        const completed_registeration = req.decoded.completed_registeration;
        const registeration_category = req.decoded.category

        Users.findById(_id, function (err, user) {
            if (err) return next(err);

            if ((completed_registeration === false) || (registeration_category != 'coperate'))
                return next(new Error(JSON.stringify({
                    title: 'failed',
                    message: "Please complete registeration",
                })));

            if (!subaccount_code || subaccount_code === "")
                return res.json({ title: 'you have not be set up as a merchant pls contact us' });

            const plan = req.body.plan
            const SECRET_KEY = getSecretKey("PAYSTACK_SECRET_KEY");
            const Authorization = 'Bearer ' + SECRET_KEY;
            const options = {
                method: 'PUT',
                uri: `https://api.paystack.co/subaccount/${subaccount_code}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authorization
                },
                body: {
                    "percentage_charge": req.body.percentage_charge,
                },
                json: true

            }
            request(options)
                .then(function (response) {
                    // if(response.message === 'Subaccount created') {
                    if (response.status === true) {
                        const {
                        data: { business_name, subaccount_code, percentage_charge, },
                            message
                    } = response;

                        user.subaccount.subaccount_code = subaccount_code;
                        user.subaccount.percentage_charge = percentage_charge;
                        user.plan = plan;

                        user.save(function (err, updatedUser) {
                            if (err) return next(err);

                            res.json({
                                message,
                                business_name
                            })
                        })
                    }
                })
                .catch(function (error) {
                    return next(new Error(error));
                })
        });
    })

module.exports = router;