const config = require('config');
const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const home = require('./routes/home');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require("express");
const app = express();
app.use(express.json());


if (!config.get('jwtPrivateKey')) {
  console.error('FATAL Error: jwtPrivateKey is not defined');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connected...'))
  .catch(err => console.log('DB connection failed...'));

//add routes
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/users', users);
app.use('/api/auth', auth);


//Server
app.listen(3000, (req, res) => {
  console.log("Listening on port 3000.....");
});