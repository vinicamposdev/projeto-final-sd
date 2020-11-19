// Get dependencies
const express = require("../../producer-humidity/node_modules/@types/express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");

const app = express();

// Parsers for POST data
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set our api routes;;
require("./routes/temperature.routes")(app);

// Get port from environment and store in Express.
const port = process.env.PORT || "3333";
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));
