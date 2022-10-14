const { validateUser } = require('../services/loginService');
const generateJWT = require('../middlewares/helpers/generateJWT');

const loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await validateUser(email, password);
    const token = generateJWT(userData);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  loginAuth,
};
