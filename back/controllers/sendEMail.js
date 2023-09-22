const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()


const sendEmail = async (req, res) => {
    try {
        const users=req.body
        console.log(users)
        const userEmails = users.map(item => item.email)
        console.log(userEmails)

        const transporter_smtp = nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.HOST_PORT,
            auth: {
                user: process.env.E_MAIL,
                pass: process.env.PASSWORD_APPLICATION
            }
        });

        const email = {
            from: 'hsnjdn@hotmail.com',
            to: userEmails,
            subject: 'Sending A Simple Email using Node.js',
            text: 'Now is the time for all good men to send Email via Node.js!'
        };

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

        res.status(200).json({ message: 'Email sent successffuly' })
    } catch {
        res.status(500).json({ message: 'somthing went wrong' })
    }
}



module.exports = { sendEmail }