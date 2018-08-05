var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var passportLocalMongoose = require("passport-local-mongoose"); 

var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var UserSchema = new Schema({
    firstName: String,
    lastname:String,
    reg_type:String, // a company or an individual
    email: String,
    date_of_birth:Number,
    verified_bvn:{
        type:Boolean,
        default:false
    },
    completed_registeration: {
        type:Boolean,
        default:false
    },
    previous_method_collection:{
        type:String,
        default:"not specified"
    },
    ngo:{
        type:Boolean,
        default:false
    },
    founder:{
        type:Boolean,
        default:false
    },
    official_phone:{
        type:String,
        default:""
    },
    personal_phone:{
        type:String,
        default:""
    },
    address:{
        type:String
    },
    social_platforms:[{type:String}],
    url:{
        type:String,
        default:""
    },

    password: String,
    role: String,
    pasreset:String,
    pasresetExpiry:{
        type:Number,
        default:Math.round(234*Math.random()+ 1)
    },
    admin:{
        type:Boolean,
        default:false
    },
    purchased: [{ type: ObjectId, ref: 'Books' }]
}, { timestamps: { createdAt: 'created_at' } });



UserSchema.plugin(passportLocalMongoose)

var UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;