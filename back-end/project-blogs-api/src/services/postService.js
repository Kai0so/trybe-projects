const { BlogPost, Category, User } = require('../database/models');

const getAll = async () => {
  const result = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      raw: true,
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      raw: true,
    }],
  });
  return result;
};

const getById = async (id) => {
  const error = { status: 404, message: 'Post does not exist' };
  const result = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      raw: true,
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      raw: true,
    }],
  });
  if (!result) throw error;
  return result;
};

module.exports = {
  getAll,
  getById,
};
