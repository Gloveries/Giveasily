var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var subaccountSchema = new Schema({
        settlement_bank: {
            type: String,
            required:true
        },
        business_name:{
            type:String,
            required:true
        },
        percentage_charge: {                 //this is required
            type: Number,
            required:true
        },
        account_number: {
            type: String,                    //this is required
            required:true
        },
        settlement_schedule: {
            type: String,
            enum: ['AUTO', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'],
            default: 'AUTO'
        },
        is_verified: {
            type: Boolean,
            default: false
        },
        subaccount_code: {
            type: String,
            required:true
        },
        id_from_paystack: {
            type:String,
            default:""
        },
        userId: {
            type: ObjectId,
            ref: 'Users',
            unique:true  //This ensures that one registered business maps to only one subaccount
        },
        paystack_created_at:{
            type:String
        },
    paystack_updated_at:{
        type:String
    }
},
    { timestamps: { createdAt: 'created_at' }}
);

var SubaccountsModel = mongoose.model('Subaccounts', subaccountSchema);

module.exports = SubaccountsModel;
