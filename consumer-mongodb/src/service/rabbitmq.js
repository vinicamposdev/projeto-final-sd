
const amqplib = require('amqplib');
const config = require('config');
const logger = require('../logger');

class RabbitMQ {

    constructor() {
        this.exchange = 'metrics';
        this.queues = config.get('consumer.queue').split('|');
        this.rabbitConfig = config.get('rabbitmq');
        this.urlAMQP = `amqp://${this.rabbitConfig.user}:${this.rabbitConfig.password}@${this.rabbitConfig.host}`;
        logger.info('Starting RabbitMQ connection : ', this.urlAMQP);
    }

    async subscribeQueue(messageHandler) {
        const conn = await amqplib.connect(this.urlAMQP);
        if (!conn) return logger.error('Consumer failed in create a connection');

        for (const queue of this.queues) {
            logger.info("Created Consumer for : ", queue);

            const channel = await conn.createChannel();
            if (!channel) return logger.error('Consumer failed in create channel');

            let queueAreAsserted = await channel.assertQueue(queue, { exclusive: false });

            if (queueAreAsserted.messageCount > 0) {
                await channel.bindQueue(queue, this.exchange, queueAreAsserted.type);
                await channel.consume(
                    queue,
                    (message) => messageHandler(message.content.toString()),
                    { noAck: true }
                );

                console.log(`Consumed from ${queue}`);
            }

            await channel.close();
        };

        await conn.close();
    }
}

const rabbitMQ = new RabbitMQ();

module.exports = rabbitMQ;