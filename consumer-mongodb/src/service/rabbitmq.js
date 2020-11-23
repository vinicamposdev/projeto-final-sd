
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
                                    let integrityMaintened = this.integrityCheck(message.content.toString());

                                    if (!integrityMaintened){// || message.fields.redelivered) {
                                        messageHandler(message.content.toString());
                                        channel.ack(message);
                                    } else {
                                        channel.nack(message);
                                    }
                                }
                            )
                        })
                    })
					.then(() => {console.log(`Consumed from ${queue}`)})
			})
			.catch((error) => console.log('error', error))
    }
    
    integrityCheck(message) {
        let messageObject = JSON.parse(message);

        if (!messageObject.hasOwnProperty('temperature')
            || !messageObject.hasOwnProperty('oxygen')
            || !messageObject.hasOwnProperty('humidity')
        ) {
            return false;
        }

        return true;
    }
}

const rabbitMQ = new RabbitMQ();

module.exports = rabbitMQ;