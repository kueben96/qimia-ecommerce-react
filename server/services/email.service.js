const nodemailer = require('nodemailer');
const Mailgen = require('mailgen')
require('dotenv').config()

let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const registerEmail = async(userEmail, user) => {
    try{
        const emailToken = user.generateRegisterToken();
        let mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'KTPizza',
                link: `${process.env.EMAIL_MAIL_URL}`
            }
        });

        const email = {
            body: {
                name: userEmail,
                intro: 'Welcome to KTPizaa! We\'re excited to have you on board',
                action: {
                    instructions: 'To get validate your account, press here :)',
                    button: {
                        color: '#508c99',
                        text: 'Validate your account',
                        link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we would love to help you out!'
            }
        }

        let emailBody = mailGenerator.generate(email);
        let message = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: 'Welcome to KTPizza',
            html: emailBody
        };

        await transporter.sendMail(message);
        return true;
    }catch(error){
        throw error
    }
}

module.exports = {
    registerEmail
} 
