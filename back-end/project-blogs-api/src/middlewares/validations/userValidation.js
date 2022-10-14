const Joi = require('joi');

const Schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateUserCreation = async (req, res, next) => {
  const { email, password, displayName } = req.body;
  const { error } = Schema.validate({ displayName, email, password });
  if (error) return res.status(400).json({ message: error.message });
  next();
};

module.exports = {
  validateUserCreation,
};