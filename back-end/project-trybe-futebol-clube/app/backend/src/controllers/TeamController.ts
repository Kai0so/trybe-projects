import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  constructor(private teamService = new TeamService()) { }

  public getAll = async (req: Request, res: Response) => {
    const result = await this.teamService.getAll();
    res.status(200).json(result);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.teamService.getById(Number(id));
    res.status(200).json(result);
  };
}
export default TeamController;
