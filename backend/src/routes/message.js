const router = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');

const authMiddleware = require('../middlewares/auth');
const messageController = require('../controllers/messageController');

router.use(authMiddleware)

router.post('/register', celebrate({
  [Segments.BODY]: Joi.object().keys({
    input: Joi.string().required(),
    output: Joi.string().required(),
    relation: Joi.string(),
  }),
}), messageController.register);

module.exports = app => app.use('/message', router);