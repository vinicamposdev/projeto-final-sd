const amqp = require('amqplib/callback_api')
const service = require('../service/rabbitmq')

const getRandom = (min,max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function connectToRabbit() {
  
  const exchange = 'metrics'

  const message = {
    type: 'humidity',
    humidity: getRandom(-150,300),
    time: new Date()
  }
  await service.sendMessage(exchange,'humidity',message)

  // amqp.connect('amqp://rabbitmq', function (error0, connection) {
  //   if (error0) {
  //     throw error0
  //   }
  
  //   connection.createChannel(function (error1, channel) {
  //     if (error1) {
  //       throw error1
  //     }
  
  //     const exchange = 'metrics'

  //     const message = {
  //       type: 'humidity',
  //       humidity: getRandom(-150,300),
  //       time: new Date()
  //     }
      
  //     channel.assertExchange(exchange, 'direct', { durable: false })
  //     const buffer = Buffer.from(JSON.stringify(message).toString())
  
  //     channel.publish(exchange, 'humidity', buffer)

  //     console.log('[X] Sent ', buffer)
  //   })
  // })
}

async function handle () {
  setInterval(connectToRabbit, 1000);
}

handle()