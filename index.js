const winston = require("winston");
const express = require("express");
var cors = require('cors')
const app = express();

app.use(cors());
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require('./startup/prod')(app);

//Server
const port = process.env.PORT || 3900;
const server = app.listen(port, (req, res) => {
  winston.info(`Listening on port ${port}.....`);
});

module.exports = server;
// https://movie-store-backend-mern.herokuapp.com/ | https://git.heroku.com/movie-store-backend-mern.git