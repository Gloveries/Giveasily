var User = require('../resources/users/users.model');
var jwt = require('jsonwebtoken');//used to create, sign, and verify token

var config = require('../config.js');

exports.getToken = function(user,expiresIn) {
    var secret = toString(config.SECRET_KEY); // secret must be either a string or a buffer
    return jwt.sign(user, secret,{
        expiresIn
    });
};

exports.verifyOrdinaryUser = function(req,res,next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

   //decode token
    var secret = toString(config.SECRET_KEY); //secret must be a string or a buffer otherwise the json.verify() function will fail, and it may not tell you that this is the reason.
    if(token) {
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                var err = new Error('you are not authenticated!');
                err.status = 401;
                console.log(err);
                return next(err);
            } else {
                //if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }

        });
    } else {
        var err = new Error('No token provided');
        err.status = 403;
        return next(err);
    }

}

exports.verifyGlobalAdminUser = function(req,res,next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

   //decode token
    var secret = toString(config.SECRET_KEY); //secret must be a string or a buffer otherwise the json.verify() function will fail, and it may not tell you that this is the reason.
    if(token) {
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                var err = new Error('you are not authenticated!');
                err.status = 401;
                console.log(err);
                return next(err);
            } else {
                //if everything is good, save to request for use in other routes
                if(!decoded.global_admin) {
                    const err = new Error('You are not a global admin');
                    err.status = 401
                    return next(err)
                }
                req.decoded = decoded;
                next();
            }

        });
    } else {
        var err = new Error('No token provided');
        err.status = 403;
        return next(err);
    }

}

exports.verifyUserEmail = function(req,res,next) {
    var token = req.params.token

   //decode token
    var secret = toString(config.SECRET_KEY); //secret must be a string or a buffer otherwise the json.verify() function will fail, and it may not tell you that this is the reason.
    if(token) {
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                var err = new Error('you are not authenticated!');
                err.status = 401;
                console.log(err);
                return next(err);
            } else {
                //if everything is good, save to request for use in other routes
                console.log(decoded);
                req.decoded = decoded;
                console.log(decoded);
                next();
            }

        });
    } else {
        var err = new Error('No token provided');
        err.status = 403;
        return next(err);
    }

}

exports.verifyAdminUser = function(req,res,next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

   //decode token
    var secret = toString(config.secretKey); //secret must be a string or a buffer otherwise the json.verify() function will fail, and it may not tell you that this is the reason.
    if(token) {
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                var err = new Error('you are not authenticated!');
                err.status = 401;
                console.log(err);
                return next(err);
            } else {
                //if everything is good, save to request for use in other routes
                console.log(decoded);
                if(!decoded.admin) {
                    return next(new Error('This is forbidden, for non admins'))
                }
                req.decoded = decoded;
                next();
            }

        });
    } else {
        var err = new Error('No token provided');
        err.status = 403;
        return next(err);
    }


}
