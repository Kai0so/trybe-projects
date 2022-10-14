import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UsersModel from '../models/usersModel';
import User from '../interfaces/user';

class UsersService {
  public model: UsersModel;

  constructor() {
    this.model = new UsersModel(connection);
  }

  public async create(user: User) {
    const createdUser = await this.model.create(user);
    const token = jwt.sign({ data: createdUser }, 'secretPass');
    return { token };
  }
}

export default UsersService;