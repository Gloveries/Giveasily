var nodemailer = require('nodemailer');
var mailerUtil = require('./mailer-util')

function sendEmail(email,purpose,id) {
    console.log("called send mail")
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'noreply.protege@gmail.com',
            pass: 'protege11',
        },
    });
    const mailOptions = mailerUtil(email,purpose,id);

    transport.sendMail(mailOptions, (error, info) => {
        console.log("in the email code")
        if (error) {
            console.log(error);
            return;            
        }
        console.log(`Message sent: ${info.response}`);
    });
}

module.exports = sendEmail;