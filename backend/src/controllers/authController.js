require("dotenv-safe").config();

const User = require('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  async authenticate(req, res) {
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

    return res.json({ token: token });
  }
};