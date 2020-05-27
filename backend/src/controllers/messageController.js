const Message = require('../models/message');

module.exports = {
  async register(req, res) {
    try {
      const { input, output, relation } = req.body;

      const message = await Message.create({
        userId: req.userId,
        input,
        output,
        relation,
      });

      return res.send({ message: 'Successful registration' })
    } catch (err) {
      return res.status(400).send({ error: 'Registration failed' });
    }
  },
  async update(req, res) {
    try {
      const { id, input, output, relation  } = req.body;

      const message = await Message.findOne({ _id: id });

      message.userId = req.userId;
      message.input = input;
      message.output = output;
      message.relation = relation;

      message.save();

      return res.send({ message: 'Successful updated' })
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.body;
      
      await Message.deleteOne({ _id: id });

      return res.send({ message: 'Successful deleted' })
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};