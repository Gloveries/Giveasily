var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var passportLocalMongoose = require("passport-local-mongoose");

var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var socialMediaSchema = new Schema({
    platform: {
        type: String,
        default: ""
    },
    url: {
        type: String,
        default: ""
    }
}, {
        timestamps: { createdAt: 'created_at' }
    })

var UserSchema = new Schema({
    firstName: String,
    lastname: String,
    email: String,
    date_of_birth: Number,
    previous_method_of_collection: {
        type: String,
        default: "not specified"
    },
    registeration_: {
        category: {
            type: String, //coperate or personal
        },
        founder: {
            type: Boolean //compulsory field
        },
        verified_bvn: {
            type: Boolean,
            default: false
        },
        completed_registeration: {
            type: Boolean,
            default: false
        }
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
    }
}, {
        timestamps: { createdAt: 'created_at' }
    });



UserSchema.plugin(passportLocalMongoose)

var UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;