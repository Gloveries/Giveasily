const template = require('./mail-template')
module.exports = function(email,purpose,id) {
            
let  mailOptions = {
    from: '"sammy from giveasily" noreply-protege@gmail.com',
    to: email,
    subject: purpose,
    html: template(email,purpose,id)
};
            
return mailOptions;

}