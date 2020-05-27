const router = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');

const authController = require('../controllers/authController');

router.post('/register', celebrate({
  [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      admin: Joi.boolean(),
  }),
}), authController.register);

router.post('/authenticate', celebrate({
  [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
  }),
}), authController.authenticate);

module.exports = app => app.use('/auth', router);