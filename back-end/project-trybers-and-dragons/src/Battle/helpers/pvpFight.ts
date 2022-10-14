import Character from '../../Character';
import Fighter from '../../Fighter';

type AllowedFighters = Character | Fighter;

const fightToDeath = (player: AllowedFighters, defender: AllowedFighters) => {
  do {
    defender.receiveDamage(player.strength);
    if (defender.lifePoints <= 0 || player.lifePoints <= 0) break;
    player.receiveDamage(defender.strength);
  } while (defender.lifePoints > 1 || player.lifePoints > 1);
};

export default fightToDeath;