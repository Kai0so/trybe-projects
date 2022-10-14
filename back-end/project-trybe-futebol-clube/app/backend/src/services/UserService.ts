import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/User';
import generateJWT from '../middlewares/helpers/generateJWT';

interface UserLogin {
  email: string;
  password: string;
}

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public login = async (userLogin: UserLogin) => {
    const userData = await UserModel.findOne({ where: { email: userLogin.email } });
    if (!userData) throw new Error();
    const validatePass = await bcrypt.compare(userLogin.password, userData.password);
    if (!validatePass) throw new Error();
    const token = generateJWT(userData);
    return { token };
  };
}
export default UserService;
