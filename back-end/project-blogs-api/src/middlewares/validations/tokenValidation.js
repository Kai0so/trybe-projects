const jwt = require('jsonwebtoken');

const secretPass = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    jwt.verify(token, secretPass);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = {
  validateToken,
};
