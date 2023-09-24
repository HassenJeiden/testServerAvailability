const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()


const sendEmail = (email) => {
    const transporter_smtp = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.HOST_PORT,
        auth: {
            user: process.env.E_MAIL,
            pass: process.env.PASSWORD_APPLICATION
        }
    });
    /*const email = {
        from: 'hsnjdn@hotmail.com',
        to: userEmails,
        subject: 'About your server avalability',
        text: {
            data: 10,
            set: function (Rmessage) {
                this.data = Rmessage;
            }
        }}*/
    transporter_smtp.verify(function (error, success) {
        if (error) {
            console.log(error);

        } else {
            console.log('Server validation done and ready for messages.')
        }
    });
    transporter_smtp.sendMail(email, function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('NodeMailer Email sent: ' + success.response);
        }
    })


}



module.exports = sendEmail()