const amqp = require('amqplib/callback_api')

const getRandom = (min,max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function connectToRabbit() {
  amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
      throw error0
    }
  
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1
      }
  
      const queue = 'temperature'
  
      const message = {
        type: 'temperature',
        temperature: getRandom(-150,300),
        time: new Date()
      }
      
      const buffer = Buffer.from(JSON.stringify(message).toString())
  
      channel.assertQueue(queue, { durable: false })
  
      channel.sendToQueue(queue, buffer)
      console.log('[X] Sent ', buffer)
    })
  })
}

async function handle () {
  setInterval(connectToRabbit, 1000);
}

handle()