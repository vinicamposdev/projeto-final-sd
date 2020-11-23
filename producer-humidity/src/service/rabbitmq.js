'use strict'

const amqplib = require('amqplib')
const config = require('config')

class RabbitMQ {
	constructor() {
		this.rabbitConfig = config.get('rabbitmq')
		const rabbitMqUrl = `amqp://${this.rabbitConfig.user}:${this.rabbitConfig.password}@${this.rabbitConfig.host}`
		this.handler = amqplib.connect(rabbitMqUrl, { keepAlive: true })
	}

	sendMessage(exchange, key, message) {
		return this.handler
			.then((connection) => connection.createChannel())
			.then((channel) =>
				channel
					.assertExchange(exchange, 'direct', { durable: false })
					.then(() => channel.publish(exchange, key, Buffer.from(JSON.stringify(message))))
					.then(() => {
                        console.log('message', message)
                        channel.close()
                    })
			)
			.catch((error) => console.log('error', error))
	}
}

const rabbitMq = new RabbitMQ()

module.exports = rabbitMq
