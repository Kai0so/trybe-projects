import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import LoginModel from '../models/loginModel';
import UserLogin from '../interfaces/login';

class LoginService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async login(userLogin: UserLogin) {
    const userData = await this.model.login(userLogin);
    if (userData.length < 1) throw new Error();
    const token = jwt.sign({ data: userData }, 'secretPass');
    return { token };
  }
}

export default LoginService;