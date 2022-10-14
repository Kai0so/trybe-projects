import sequelize from '../database/models';
import { getHomeQuery, getAwayQuery, getAllQuery } from './utils/index';

class LeaderBoardService {
  static async getHome() {
    const [homeLeaderBoard] = await sequelize.query(getHomeQuery);
    return homeLeaderBoard;
  }

  static async getAway() {
    const [awayLeaderBoard] = await sequelize.query(getAwayQuery);
    return awayLeaderBoard;
  }

  static async getAll() {
    const [allLeaderBoard] = await sequelize.query(getAllQuery);
    return allLeaderBoard;
  }
}

export default LeaderBoardService;
