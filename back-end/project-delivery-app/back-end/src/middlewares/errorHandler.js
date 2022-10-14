const httpStatus = {
  'Invalid email': 404,
  'Invalid password': 404,
  'Token not found': 404,
  'Token must be a valid token': 401,
  'User already exists': 409,
  'User not found': 404,
};

const errorHandler = (error, _req, res, _next) => {
  const { message } = error;

  const errorStatus = httpStatus[message];

  if (!errorStatus) {
    return res.status(500).json({ message });
  }
  return res.status(errorStatus).json({ message });
};

module.exports = errorHandler;
