const winston = require('winston');
const express = require("express");
const app = express();
require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();


//Server
app.listen(3000, (req, res) => {
  winston.info("Listening on port 3000.....");
});