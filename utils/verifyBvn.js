exports.verifyBvn = function(user) {

//mimick an api call
const choice = [true,false];
const num = ["78636","984093","8374938","93840","37498","834983","983489"]
const status = choice[Math.round(Math.random() + 1)]
const phone = num[Math.round(Math.random() + 6)]
return setTimeout(function(){
return {
    status,
    phone
}
},2000)

}