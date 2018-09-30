module.exports = function(response,errCode,callback,message) {
var err = new Error();
err.status = errCode;
err.message = message
    next(err)
//return response.status(errCode)
//          .json({err})
}