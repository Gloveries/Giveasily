var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var BookSchema = new Schema({
    title: String,
    isbn: String,
    description: String,
    price: Number,
    userId: {
        type: ObjectId,
        ref: 'Users'
    }
});

var BookModel = mongoose.model('Books', BookSchema);

module.exports = BookModel;
