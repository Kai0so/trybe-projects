import { Op } from 'sequelize';
import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';

type MatchData = {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
};

type ScoreData = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

class MatchService {
  public model: MatchModel;

  constructor() {
    this.model = new MatchModel();
  }

  public getAll = async () => {
    const matchesData = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
          attributes: { exclude: ['id'] },
          as: 'teamHome',
        },
        {
          model: TeamModel,
          attributes: { exclude: ['id'] },
          as: 'teamAway',
        },
      ],
    });
    return matchesData;
  };

  public create = async (matchData: MatchData) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = matchData;
    const foundTeams = await TeamModel.findAll({
      where: {
        [Op.or]: [
          { id: homeTeam },
          { id: awayTeam },
        ],
      },
    });
    if (foundTeams.length < 2) throw new Error();
    const insertedMatch = await MatchModel.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
    });
    return insertedMatch;
  };

  public finish = async (id: number) => {
    const message = 'Finished';
    await MatchModel.update(
      { inProgress: false },
      { where: { id } },
    );
    return message;
  };

  public updateScore = async (id: number, scoreData: ScoreData) => {
    const { homeTeamGoals, awayTeamGoals } = scoreData;
    const message = 'Success!';
    await MatchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return message;
  };
}

export default MatchService;
