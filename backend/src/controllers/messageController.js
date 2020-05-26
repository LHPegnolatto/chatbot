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
};