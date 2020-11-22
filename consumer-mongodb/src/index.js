// const amqp = require('amqplib/callback_api')
// const db = require("./models");

// // 1. Conectar no RabbitMQ com AMQP
// amqp.connect('amqp://rabbitmq', function (error, connection) {
//     if (error) {
//         throw error
//     }
// });

// // 2. Conectar no Mongo Altas com URL
// db.mongoose
//     .connect(db.url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true
//     })
//     .then((db) => {
//         console.log("Connected to the database!");
//         // 3. Conectar a uma collection e salvar os dados
//         db.collection('dummy')

//     })
    // .catch((err) => {
    //     console.log("Cannot connect to the database!", err);
    //     process.exit();
    // });

// require('./dummyConsumer');
require('./consumer');