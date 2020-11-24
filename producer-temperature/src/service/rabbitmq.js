'use strict'

const amqplib = require('amqplib')
const config = require('config')

class RabbitMQ {
	constructor() {
		this.rabbitConfig = config.get('rabbitmq')
		const rabbitMqUrl = `amqp://${this.rabbitConfig.user}:${this.rabbitConfig.password}@${this.rabbitConfig.host}`
        this.handler = amqplib.connect(rabbitMqUrl, { keepAlive: true })
        this.invalid_exchange = 'invalid_data';
	}

	sendMessage(exchange, key, message) {
		return this.handler
			.then((connection) => connection.createChannel())
			.then((channel) =>
                channel
                    .assertExchange(this.invalid_exchange, 'fanout', { durable: false })
                    .then(() =>
                        channel
                        .assertExchange(exchange, 'direct', { durable: false })
                        .then(() => {
                            let integrityMaintened = this.integrityCheck(JSON.stringify(message));

                            if (integrityMaintened) {
                                channel.publish('invalid_data', '', Buffer.from(JSON.stringify(message)))
                            } else {
                                channel.publish(exchange, key, Buffer.from(JSON.stringify(message)))
                            }
                        })
                        .then(() => {
                            console.log('message', message)
                            channel.close()
                        })
                    )
			)
			.catch((error) => console.log('error', error))
    }

    async subscribeQueue(queue, messageHandler) {
		return this.handler
			.then((conn) => conn.createChannel())
			.then((channel) => {
				return channel
					.assertQueue(queue, { exclusive: false })
                    .then(() => {
                        return channel
                        .bindQueue(queue, this.invalid_exchange, this.invalid_exchange)
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

    integrityCheck(message) {
        let messageObject = JSON.parse(message);

        if ((messageObject.type === 'temperature' && !messageObject.hasOwnProperty('temperature'))
            || (messageObject.type === 'oxygen' && !messageObject.hasOwnProperty('oxygen'))
            || (messageObject.type === 'humidity' && !messageObject.hasOwnProperty('humidity'))
        ) {
            return false;
        }

        return true;
    }
}

const rabbitMq = new RabbitMQ()

module.exports = rabbitMq
