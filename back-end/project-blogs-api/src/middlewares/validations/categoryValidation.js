const Joi = require('joi');

const Schema = Joi.object({
  name: Joi.string().required(),
});

const validateCategoryCreation = async (req, res, next) => {
  const { name } = req.body;
  const { error } = Schema.validate({ name });
  if (error) return res.status(400).json({ message: error.message });
  next();
};

module.exports = {
  validateCategoryCreation,
};