import Character from '../Character';
import Fighter from '../Fighter';
import Battle from './Battle';
import fightToDeath from './helpers/pvpFight';

class PVP extends Battle {
  private _defender: Character | Fighter;

  constructor(player: Character | Fighter, defender: Character | Fighter) {
    super(player);
    this._defender = defender;
  }

  fight(): number {
    fightToDeath(this.player, this._defender);
    return this.player.lifePoints === -1 ? -1 : 1;
  }
}
export default PVP;