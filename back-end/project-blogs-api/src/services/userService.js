const { User } = require('../database/models');

const create = async (displayName, email, password, image) => {
  const error = { status: 409, message: 'User already registered' };
  const invalidUser = await User.findOne({ where: { email } });
  if (invalidUser) throw error;
  const createdUser = await User.create({ displayName, email, password, image });
  return {
    id: createdUser.id,
    displayName: createdUser.displayName,
    email: createdUser.email,
    image: createdUser.image,
  };
};

const getAll = async () => {
  const result = await User.findAll({ attributes: { exclude: 'password' } });
  return result;
};

const getById = async (id) => {
  const error = { status: 404, message: 'User does not exist' };
  const result = await User.findOne({
    where: { id },
    attributes: {
      exclude: 'password',
    },
  });
  if (!result) throw error;
  return result;
};

module.exports = {
  create,
  getAll,
  getById,
};
