const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()



    const transporter_smtp = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.HOST_PORT,
        auth: {
            user: process.env.E_MAIL,
            pass: process.env.PASSWORD_APPLICATION
        }
    });

    transporter_smtp.verify(function (error, success) {
        if (error) {
            console.log(error);

        } else {
            console.log('Server validation done and ready for messages.')
        }
    });
    module.exports.sendEmail = function (email)  {
    transporter_smtp.sendMail(email, function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('NodeMailer Email sent: ' + success.response);
        }
    })

}