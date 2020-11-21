const config = require('config');
const logger = require('./logger');
const rabbitMQ = require('./service/rabbitmq');

class BookingConsumer {
    constructor() {
        this.queue = config.get("consumer").queue;
        rabbitMQ.subscribeQueue('temperature', this.handleMessage.bind(this));// |.split()
        logger.info("Created Consumer for : ", this.queue);
    }

    async handleMessage(rawMessage) {
        await Promise.resolve();
        try {
            const message = JSON.parse(rawMessage);
            console.log("\n\n\n\n\n\n\n\n\ RABBITMQ message", message);
            // switch (message.type) {
            //     case (messages.BOOKING_CREATE_EVENT):
            //         return logger.debug(`Received Booking created event : ${JSON.stringify(message)}`);
            //     case (messages.BOOKING_CANCEL_EVENT):
            //         return logger.debug(`Received Booking cancel event : ${JSON.stringify(message)}`);
            //     default:
            //         return logger.warn(`Unsupported message type : ${message.type}`);
            // }
        } catch (error) {
            logger.error(`Failed to handle message : ${rawMessage}`);
        }
    }
}

const bookingConsumer = new BookingConsumer();

module.exports = bookingConsumer;