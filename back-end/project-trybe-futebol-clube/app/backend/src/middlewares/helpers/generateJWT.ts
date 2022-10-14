import * as jwt from 'jsonwebtoken';

const secretPass = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '15m',
};

const generateJWT = (payload: jwt.JwtPayload) => {
  const token = jwt.sign({ data: payload }, secretPass as jwt.Secret, jwtConfig);
  return token;
};

export default generateJWT;
