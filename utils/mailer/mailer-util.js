module.exports = function(purpose,email,id) {
    let mailOptions  = {};
    switch (purpose) {
        case "registeration":
              mailOptions = {
                from: '"sammy from giveasily" noreply-protege@gmail.com',
                to: email,
                subject: 'Please complete registeration',
                html: `<h3>Hello ${email} Thank you for registering with us, we are very pleased
                that you have taken this step to join us in our bid to build,
                let us make it easy for you.dummy text
                <p>For any enquiry contact us at enquiry@giveeasily.com</p>
                <p><a href="http://localhost:3000.com/users/${id}">click on this link to complete your registeration</a>
                <small>If this mail is not meant for you please ignore. Thanks</small>`
            };
            break;
            case "birthday":
            mailOptions = {}
            break;
            
            
    }

    return mailOptions;
}