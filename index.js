const Joi = require("joi");
const genres = require('./routes/genres');
const home = require('./routes/home');
const express = require("express");
const app = express();
app.use(express.json());

//add routes
app.use('/', home);
app.use('/api/genres', genres);


//Server
app.listen(3000, (req, res) => {
  console.log("Listening on port 3000.....");
});