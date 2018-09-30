const pledgesModel = require('./pledges.model.js');
const generateController = require('../../utils/generateController');
const handleVerificationError = require('../../utils/handleVerificationError');
module.exports = generateController(pledgesModel,{
    createOne: function (req, res, next) {
      
        const {status,amount,platform, beneficiaryId,benefactorId,purpose,description,date_to_redeem_pledge} = req.body;
        
        const body = {status,amount,platform,beneficiaryId,benefactorId,purpose,description,date_to_redeem_pledge};
        
        if(!benefactorId || platform === 'form') delete body.benefactorId; //if pledges are made from donation forms
        

        const errorMsg1 = 'There was an error submitting your pledge, pls contact customer service';
        const errorMsg2 = 'Please select a date in the near future'
  
        if(!status || status !== 'unredeemed') return handleVerificationError(res,500,errorMsg1)
        
        console.log("abd")
        const redeemDateSinceEpoch = +new Date(date_to_redeem_pledge);
        const currentDateSinceEpoch = +new Date();
        
        if(redeemDateSinceEpoch < currentDateSinceEpoch) return handleVerificationError(res,500,errorMsg2)

        console.log(+new Date('2018-09-01') > +new Date())
        
        pledgesModel.create(body, function (err, doc) {
                if (err) return next(err);
                res.json({title:'success',message:'You have pledged have been recieved'});
            });
        },
    getUnredeemedPledges:function(req,res,next) {
        if(!req.decoded.completed_registeration) return res.json({
            title:"failed",
            message:"please complete your registeration"});
            
            const benefactorId = req.decoded._id;
            const status = 'unredeemed';
            const query = {status,benefactorId}

            pledgesModel
                .find(query)
                .populate('beneficiaryId')
                .exec(function(err,pledge){
                    if(err) return next(err);
                    
                    res.json(pledge);
                
            })
    },

    getAll:function(req,res,next) {
        //queries->beneficiaryId can be any of --->'unredeemed','redeemed','all
        const status = req.query.status;
        const beneficiaryId = req.decoded._id;
        
//        const query = {status, beneficiaryId};
        const query = req.query;
        

        pledgesModel.find(query)
        .populate('benefactorId', 'first_name','last_name')
        .exec(function(err,pledges) {
            if(err) return next(err);
            const {
                    amount,status,purpose,description,
                    date_to_redeem_pledge,benefactorId:{first_name,last_name}          
                  } = pledges;

            res.json({amount,status,description,date_to_redeem_pledge,first_name,last_name})
        })


    }
})
