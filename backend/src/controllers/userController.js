const User = require('../models/user');

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
  async update(req, res) {
    try {
      const { id, name, email, admin } = req.body;

      if(await User.findOne({ email, _id: { $ne: id } }))
        return res.status(400).send({ error: 'User already exists' })

      const requestUser = await User.findOne({ _id: req.userId });

      if(!requestUser.admin || id === req.userId)
        return res.status(401).send({ error: 'User without permission for this action' })

      const responseUser = await User.findOne({ _id: id });

      responseUser.name = name;
      responseUser.email = email;
      responseUser.admin = admin ? true : false;

      responseUser.save();

      return res.send({ message: 'Successful updated' })
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  async delete(req, res) {
    try {
      const { email } = req.body;

      if(!await User.findOne({ email }))
        return res.status(400).send({ error: 'User not exists' })

      const requestUser = await User.findOne({ _id: req.userId });
      
      if(!requestUser.admin || requestUser.email === email)
        return res.status(401).send({ error: 'User without permission for this action' })

      await User.deleteOne({ email });

      return res.send({ message: 'Successful deleted' })
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};