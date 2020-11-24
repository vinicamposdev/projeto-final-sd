const nodemailer = require('nodemailer');
const logger = require('./logger');

class Email {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "a6a77740a277e6",
              pass: "80e06b7a11e853"
            }
          });
    }

    sendMail(contentEmail) {
        const mailOptions = {
            from: 'noreply@atmospheric.com',
            to: 'technical@atmospheric.com',
            subject: 'Dados inválidos',
            text: contentEmail
        };

        return this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                logger.error(`Error to send email : ${JSON.stringify(error)}`);
            } else {
                logger.info(`Email sent:  ${info.response}`);
            }
        });
    }
}

const email = new Email();

module.exports = email;