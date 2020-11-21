const amqp = require('amqplib/callback_api')
const service = require('../service/rabbitmq')

const getRandom = (min,max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function connectToRabbit() {
  
  const exchange = 'metrics'

  const message = {
    type: 'temperature',
    temperature: getRandom(-150,300),
    time: new Date()
  }
  await service.sendMessage(exchange,'temperature',message)

}

async function handle () {
  setInterval(connectToRabbit, 5000);
}

handle()