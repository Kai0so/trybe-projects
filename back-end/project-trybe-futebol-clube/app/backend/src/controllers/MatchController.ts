import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  constructor(private matchService = new MatchService()) { }

  public getAll = async (req: Request, res: Response) => {
    const result = await this.matchService.getAll();
    res.status(200).json(result);
  };

  public create = async (req: Request, res: Response) => {
    try {
      const errorMessage = { message: 'It is not possible to create a match with two equal teams' };
      const { homeTeam, awayTeam } = req.body;
      if (homeTeam === awayTeam) {
        return res.status(401).json(errorMessage);
      }
      const result = await this.matchService.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(404).json({ message: 'There is no team with such id!' });
    }
  };

  public finish = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this.matchService.finish(Number(id));
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };

  public updateScore = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this.matchService.updateScore(Number(id), req.body);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
}
export default MatchController;
