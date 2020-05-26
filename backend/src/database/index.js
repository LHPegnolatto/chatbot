const mongoose = require('mongoose');

const mongooseOptions = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

mongoose.connect('mongodb://localhost/chatbot', mongooseOptions);
mongoose.Promise = global.Promise;

module.exports = mongoose;