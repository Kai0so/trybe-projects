const Joi = require('joi');

const Schema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'Some required fields are missing',
    }),
  password: Joi.string().min(6).required()
    .messages({
      'string.empty': 'Some required fields are missing',
    }),
});

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = Schema.validate({ email, password });
  if (error) return res.status(400).json({ message: error.message });
  next();
};

module.exports = {
  validateLogin,
};