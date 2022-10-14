import TeamModel from '../database/models/Team';

class TeamService {
  public model: TeamModel;

  constructor() {
    this.model = new TeamModel();
  }

  public getAll = async () => {
    const teamsData = await TeamModel.findAll();
    return teamsData;
  };

  public getById = async (id: number) => {
    const teamData = await TeamModel.findOne({ where: { id } });
    return teamData;
  };
}
export default TeamService;
