var nodemailer = require('nodemailer');
var mailerUtil = require('./mailer-util')

function sendEmail(email,res,id) {
    console.log("called send mail")
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'noreply.protege@gmail.com',
            pass: 'protege11',
        },
    });
    const mailOptions = mailerUtil("registeration",email,id)


    transport.sendMail(mailOptions, (error, info) => {
        console.log("in the email code")
        if (error) {
            console.log(error);
            res.json({message:"failed to send a verification email"})
        }
        console.log(`Message sent: ${info.response}`);
        res.json({message:"log on to your mail to complete registeration"})
    });
}

module.exports = sendEmail;