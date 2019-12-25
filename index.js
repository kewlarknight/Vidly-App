const Joi = require('joi');
Joi.ObjectId = require('joi-objectid').(Joi);
const mongoose = require('mongoose');
const Joi = require("joi");
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const home = require('./routes/home');
const express = require("express");
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('DB Connected...'))
  .catch(err => console.log('DB connection failed...'));

//add routes
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);


//Server
app.listen(3000, (req, res) => {
  console.log("Listening on port 3000.....");
});