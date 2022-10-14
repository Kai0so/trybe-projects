import { Pool } from 'mysql2/promise';
import UserLogin from '../interfaces/login';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async login(user: UserLogin) {
    const { username, password } = user;
    const query = `SELECT id, username FROM Trybesmith.Users
    WHERE username = ? AND password = ? LIMIT 1;`;
    const [result] = await this.connection.execute(query, [username, password]);
    const userData = JSON.parse(JSON.stringify(result));
    return userData;
  }
}