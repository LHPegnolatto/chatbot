require("dotenv-safe").config();

const User = require('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  async register(req, res) {
    try {
      const { email } = req.body;
      
      if(await User.findOne({ email }))
        return res.status(400).send({ error: 'User already exists' })

      const user = await User.create(req.body);

      user.password = undefined;
      user.createdAt = undefined;

      return res.send({ user })
    } catch (err) {
      return res.status(400).send({ error: 'Registration failed' })
    }
  },
  async authenticate(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');

      if (!user)
        return res.status(400).json({ error: 'User email not found' });

      if (!await bcrypt.compare(password, user.password))
        return res.status(400).json({ error: 'Invalid password' });

      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 86400,
      });

      user.password = undefined;
      user.createdAt = undefined;

      return res.json({ user: user, token: token });
    } catch (err) {
      return res.status(400).send({ error: 'Authentication failed' })
    }
  }
};