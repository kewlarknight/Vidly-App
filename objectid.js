const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();
console.log(id);
console.log(id.getTimestamp()); 