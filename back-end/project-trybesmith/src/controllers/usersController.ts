import { Request, Response } from 'express';
import UsersService from '../services/usersService';

class UsersController {
  constructor(private userService = new UsersService()) { }

  public create = async (req: Request, res: Response) => {
    const { 
      username,
      classe,
      level,
      password }: { username: string; classe: string, level: number, password: string } = req.body;
    const user = { username, classe, level, password };
    const result = await this.userService.create(user);
    res.status(201).json(result);
  };
}

export default UsersController;