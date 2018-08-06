const pledgesModel = require('./pledges.model.js');
const generateController = require('../../utils/generateController');

module.exports = generateController(pledgesModel,{
    createOne: function (req, res, next) {
        if(!req.decoded.completed_registeration) return res.json({message:"please complete your registeration"});
        
        pledgesModel.create(req.body, function (err, doc) {
                if (err) return next(err);
                res.send(doc);
            });
        }
})
