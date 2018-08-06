var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId

var pledgeSchema = new Schema({
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
    amount_fulfilled: {
        type:Number
    },
    date_to_redeem_pledge:{
        type:Number //store date as number of milliseconds from epoch time

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