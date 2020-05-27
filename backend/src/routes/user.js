const router = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');

const authMiddleware = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.use(authMiddleware);

router.put('/update', celebrate({
  [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().required(),
      admin: Joi.boolean(),
  }),
}), userController.update);

router.delete('/delete', celebrate({
  [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
  }),
}), userController.delete);

module.exports = app => app.use('/user', router);