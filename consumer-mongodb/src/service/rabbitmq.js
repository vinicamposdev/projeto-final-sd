
const amqplib = require('amqplib');
const config = require('config');
const logger = require('./logger');

class RabbitMQ {

    constructor() {
        this.exchange = 'metrics';
        this.queues = config.get('consumer.queue').split('|');
        this.rabbitConfig = config.get('rabbitmq');
        this.urlAMQP = `amqp://${this.rabbitConfig.user}:${this.rabbitConfig.password}@${this.rabbitConfig.host}`;
        logger.info('Starting RabbitMQ connection : ', this.urlAMQP);
        this.handler = amqplib.connect(this.urlAMQP, { keepAlive: true });
    }

    async startConsumeQueues(messageHandler) {
        for (const queue of this.queues) {
            await this.subscribeQueue(queue, messageHandler)
        };
    }

    subscribeQueue(queue, messageHandler) {
		return this.handler
			.then((conn) => conn.createChannel())
			.then((channel) => {
				return channel
					.assertQueue(queue, { exclusive: false })
                    .then(() => {
                        return channel
                        .bindQueue(queue, this.exchange, queue)
                        .then(()=>{
                            channel.consume(
                                queue,
                                (message) => {
                                    messageHandler(message.content.toString());
                                    channel.ack(message);
                                }
                            )
                        })
                    })
					.then(() => {console.log(`Consumed from ${queue}`)})
			})
			.catch((error) => console.log('error', error))
    }
}

const rabbitMQ = new RabbitMQ();

module.exports = rabbitMQ;