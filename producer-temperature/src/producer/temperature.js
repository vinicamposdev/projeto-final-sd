const service = require('../service/rabbitmq');
const mailer = require('../service/mailer');

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

async function connectToRabbit() {

    const exchange = 'metrics'

    const message = {
        type: 'temperature',
        temperature: getRandom(-150, 300),
        time: new Date()
    }
    await service.sendMessage(exchange, 'temperature', message)
}

async function subscribeInvalidDataQueue() {
    let invalidMessages = [];
    await service.subscribeQueue('invalid_data', function (messageRaw) {
        invalidMessages.push(messageRaw);
    });

    setInterval(() => {
        if (invalidMessages.length > 0) {
            mailer.sendMail(JSON.stringify(invalidMessages));
            invalidMessages = [];
        }
        
    }, 5000);
}

async function handle() {
    setInterval(connectToRabbit, 100);
    await subscribeInvalidDataQueue();
}

handle()