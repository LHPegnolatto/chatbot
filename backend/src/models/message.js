const mongoose = require('../database');

const MessageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;