var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var passportLocalMongoose = require("passport-local-mongoose");

var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var socialMediaSchema = new Schema({
    platform: {
        type: String,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    },
    url: {
        type: String,
        default: ""
    }
}, {
        timestamps: { createdAt: 'created_at' }
    })

var authorizationSchema = new Schema({
    
    authorization_code: String, //Authorization code that can be used to issue new billing
    
    bin: String, // card bin number
    
    last4: String, // last four digit of card
    
    exp_month: String,
    
    exp_year: String,
    
    channel: String,
    
    card_type: String,
    
    bank: String,
    
    country_code: String,
    
    brand: String,
    
    reusable: Boolean,
    
    signature: String 
    
})


var UserSchema = new Schema({
    first_name: String,                 //this is required

    last_name: String,                  //this is required

    email: String,                      //this is required

    type_of_organisation:{
        type:String,                    //religious_body,ngo,alumni,others
        default:""
    },
    coporate_address:{
        type:String,
        default:""
    },

    global_admin: {
        type: Boolean,
        default: false
    },
    completed_email_verification: {
        type: Boolean,
        default: false
    },
    date_of_birth: {
        type: String,
        default: new Date().toDateString()
    },
    previous_method_of_collection: {
        type: String,
        default: "not specified"
    },
    category: {
        type: String, //coperate or personal
        default: 'coporate'
    },
    founder: {
        type: Boolean, //compulsory field
        default: true

    },
    other_platforms:{
        type:String,
        default:""
    },
    other_methods:{
        type:String,
        default:""
    },
    verified_bvn: {
        type: Boolean,
        default: false
    },
    complete: {
        type: Boolean,
        default: false
    },
    official_phone: {
        type: String,
        default: ""
    },
    personal_phone: {
        type: String,
        default: ""
    },
    address: {
        type: String
    },
    subaccount:{
        type:ObjectId,
        ref:'Subaccounts'
    }
    ,
    social_platforms: [socialMediaSchema],
    website_url: {
        type: String,
        default: ""
    },
    pasreset: String,
    pasresetExpiry: {
        type: Number,
        default: Math.round(234 * Math.random() + 1)
    },
    admin: {
        type: Boolean,
        default: false
    },
    authorization:[authorizationSchema]
}, {
        timestamps: { createdAt: 'created_at' }
    });


var options = {
    usernameField:'email'
}
UserSchema.plugin(passportLocalMongoose,options)

var UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;