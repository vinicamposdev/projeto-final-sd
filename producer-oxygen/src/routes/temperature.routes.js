const router = require("express").Router();

module.exports = (app) => {
  const temperature = require("../controllers/temperature.controller");

  router.get("/", temperature.findAll);

  app.use("/temperature", router);
};
