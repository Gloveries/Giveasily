const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;
const Schema = mongoose.Schema;

const PagesSchema = new Schema({

name:{
    type:String,
    required:true
},
userId:{
        type:ObjectId,
        ref:'Users'
},
amount:{
    type:String,
    default:""
},
page_id:{
    type:String     //an id from paystack
},
active:{
    type:Boolean
},
published :{
    type:Boolean,       
    required:true
},
url:{
    type:String,
    required:true
},
currency:{
    type:String,
    required:true
},
type:{
    type:String         //one type is 'payment' from paystack
},
paystack_created_at:{
    type:String
},
paystack_updated_at:{
    type:String
},
description:{
    type:String
},
slug:{
    type:String // your payment page will be available on htt
}
},{ timestamps: { createdAt: 'created_at',updatedAt:'updated_at' } })


const Pages = mongoose.model('Page',PagesSchema);

module.exports = Pages;