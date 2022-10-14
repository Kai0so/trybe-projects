const { User } = require('../database/models');

const validateUser = async (email, password) => {
  const error = { status: 400, message: 'Invalid fields' };
  const validUser = await User.findOne({ where: { email, password } });
  if (!validUser) throw error;
  return {
    id: validUser.id,
    displayName: validUser.displayName,
    email: validUser.email,
    image: validUser.image,
  };
};

module.exports = {
  validateUser,
};
