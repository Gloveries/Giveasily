var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId

var donationSchema = new Schema({
    amount:{
        type:Number
    },
    benefactor:{
        type:ObjectId,
        ref:'user'
    },
    beneficiary:{
        type:ObjectId,
        ref:'user'
    },
    purpose:{
        type:String //It could be tithe or otherwise
    },
    description:{
        type:String
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

const donations = mongoose.model('donation',donationSchema)

module.exports = donations;