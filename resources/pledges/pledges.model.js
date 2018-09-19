var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId

var pledgeSchema = new Schema({
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['redeemed','unredeemed'],
        required:true
    },
    platform:{
        type:String,                //For now this will always be 'dashboard' as only our users are allowed to pledge   
        enum:['dashboard','form'],  
        required:true
    },
    benefactorId:{
        type:ObjectId,  
        ref:'Users'   
    },
    beneficiaryId:{     //This field is required because all pledges must have a beneficiary
        type:ObjectId,  //The benefacor field isnt required though all pledges must have a benefactor
        ref:'Users',     //But not all benefactors must be registered with us in order to donate.     
        required:true 
    },
    donationId:{
        type:ObjectId, //This will contain the id of the donation document created after a pledge is redeemed
        ref:'donation'  // This will only contain a value if this pledge has been redeemed.
        
    },
    pledge_redeemed_at:{
        type:String
    },
    purpose:{
        type:String //It could be tithe or otherwise
    },
    description:{
        type:String,
        default:""
    },
    amount_fulfilled: {
        type:Number,    //this field is useful when we implement users able to redeem theri pledge installmentally;
        default:0
    },
    date_to_redeem_pledge:{
        type:String,
        require:true

    },
    subscription:{
        type:Boolean,
        default:false
    },
    subscription_id:{ //A unique id, common to all donations based on all documents
        type:Number   //with the same subscription
    },
    subscription_frequency:{
        type:String //monthly or yearly
    }
},    { timestamps: { createdAt: 'created_at' } }
)

const pledges = mongoose.model('pledge',pledgeSchema)

module.exports = pledges;