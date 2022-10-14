import * as jwt from 'jsonwebtoken';

const secretPass = process.env.JWT_SECRET || '';

const decodeJWT = <JWTpayload>(token: string) => {
  try {
    const decoded = jwt.verify(token, secretPass);
    return decoded as JWTpayload;
  } catch (error) {
    return false;
  }
};

export default decodeJWT;
