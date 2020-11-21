const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbConfig = require("../../config/database.config.js");
const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.vehicle = require("./temperature.models")(mongoose);

module.exports = db;