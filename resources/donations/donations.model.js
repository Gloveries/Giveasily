var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId

var donationSchema = new Schema({    
    amount:{
        type:Number
    },
    platform:{
        type:String,
        enum:['dashboard','form'] //This field willlet us know if the donation was made from our registered user(i.e from dashbord)
    },                            // or it was from a form,  in this case the user may or may not be registered members of giveasily
    
    paid_at:String,
    
    reference:String,
    
    benefactorId:{
        type:ObjectId,
        ref:'Users'
    },
    beneficiaryId:{
        type:ObjectId,
        ref:'Users'
    },
    
    referrer:String, //domain that initiated the request e.g giveasily.com
    
    ip_address:String, //This is gooten from paystack may be useful for tracking in the case of a security issue
    
    purpose:{
        type:String,
        default:"general Purpose" //It could be tithe or otherwise
    },

    description:{
        type:String,
        default:""
    },
    subscription:{
        type:Boolean,
        default:false
    },
    subscription_id:{ //A unique id, common to all donations based on all documents
        type:Number //with the same subscription
    },
    subscription_frequency:{
        type:String //monthly or yearly
    },
    paystack_created_at:{
        type:String
    },
    paystack_paid_at:{
        type:String
    }
},    { timestamps: { createdAt: 'created_at' } }
)

const donations = mongoose.model('donation',donationSchema)

module.exports = donations;