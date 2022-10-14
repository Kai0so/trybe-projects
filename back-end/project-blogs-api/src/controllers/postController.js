const Post = require('../services/postService');

const getAll = async (_req, res) => {
  try {
    const result = await Post.getAll();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Post.getById(id);
    res.status(200).json(result);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
};
