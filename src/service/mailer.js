'use strict';
var nodemailer = require('nodemailer');





exports.send = function(toEmail, text, subject){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.password
        }
    });

    var mailOptions = {
        from: '"Oorjan 👻" <kaur.harsimran301@gmail.com>', // sender address
        to: toEmail,
        subject: subject,
        text: text,
        html: text // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}