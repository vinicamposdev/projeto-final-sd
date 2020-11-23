const nodemailer = require('nodemailer');
const logger = require('./logger');

class Email {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "80dee71b41b49a",
                pass: "9a36daddf2eabe"
            }
        });
    }

    sendMail({ contentEmail } = {}) {
        const mailOptions = {
            from: 'noreply@atmospheric.com',
            to: 'station@atmospheric.com',
            subject: 'Métricas Atmosféricas',
            text: contentEmail
        };

        return this.sendMail(mailOptions, function (error, info) {
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