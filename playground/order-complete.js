var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    
    if(req.body){console.log(req.body);}
    if(req.query){console.log(req.query);}
    
    res.render('order-complete');
});




module.exports = router;
