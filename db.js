var mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost:27017/giveasily',  { useNewUrlParser: true },function(){
        console.log("connected to database")
    })
}