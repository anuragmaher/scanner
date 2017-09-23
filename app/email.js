'use strict';

const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = {
  sendmail : function(fromEmail, body){

    const transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        auth: {
            user: config.smtp.user,
            pass: config.smtp.pass
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'Support <support@gmailsharedtasks.com>', // sender address
        to: fromEmail,
        subject: 'Flight Details ', // Subject line
        html: body // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  }
}
