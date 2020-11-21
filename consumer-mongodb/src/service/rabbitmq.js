
const amqplib = require('amqplib');
const config = require('config');
const logger = require('../logger');

class RabbitMQ {

    constructor() {
        this.exchange = 'metrics';
        this.rabbitConfig = config.get('rabbitmq');
        const rabbitMqUrl = `amqp://${this.rabbitConfig.user}:${this.rabbitConfig.password}@${this.rabbitConfig.host}`;
        logger.info('Starting RabbitMQ connection :', rabbitMqUrl);
        this.handler = amqplib.connect(rabbitMqUrl, { keepAlive: true });
    }

    subscribeQueue(queue, messageHandler) {
        return this.handler
            .then(conn => conn.createChannel())
            .then(channel => {
                logger.info(`Consuming from ${queue}`);
                return channel.assertQueue(queue, { exclusive: false })
                    .then(() => {
                        channel.bindQueue(queue, this.exchange, 'temperature')
                        channel.consume(queue, message => messageHandler(message.content.toString()), { noAck: true })
                    })
                    .then(() => logger.info(`Consumed from ${queue}`))
            })
            .catch(logger.error);
    }

}

const rabbitMQ = new RabbitMQ();

module.exports = rabbitMQ;