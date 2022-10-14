import Character from '../Character';
import Fighter, { SimpleFighter } from '../Fighter';
import Battle from './Battle';
import fightToDeath from './helpers/pveFight';

type MonstersType = [Fighter | SimpleFighter];

class PVE extends Battle {
  private _monsters: [Fighter | SimpleFighter];

  constructor(player: Character | Fighter, monsters: MonstersType) {
    super(player);
    this._monsters = monsters;
  }

  fight(): number {
    fightToDeath(this.player, this._monsters);
    return this.player.lifePoints === -1 ? -1 : 1;
  }
}
export default PVE;