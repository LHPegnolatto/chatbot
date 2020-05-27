const Message = require('../models/message');

module.exports = {
  async register(req, res) {
    const { input, output, relation } = req.body;

    const message = await Message.create({
      userId: req.userId,
      input,
      output,
      relation,
    });

    return res.send({ message: 'Successful registration' })
  },
  async update(req, res) {
    const { id, input, output, relation  } = req.body;

    const message = await Message.findOne({ _id: id });

    message.userId = req.userId;
    message.input = input;
    message.output = output;
    message.relation = relation;

    message.save();

    return res.send({ message: 'Successful updated' })
  },
  async delete(req, res) {
    const { id } = req.body;
    
    await Message.deleteOne({ _id: id });

    return res.send({ message: 'Successful deleted' })
  },
};