import Character from '../../Character';
import Fighter from '../../Fighter';
import SimpleFighter from '../../Fighter/SimpleFighter';

type AllowedFighters = Character | Fighter;

type AllowedMonsters = [Fighter | SimpleFighter];

const fightToDeath = (player: AllowedFighters, monsters: AllowedMonsters) => {
  monsters.forEach((monster) => {
    do {
      monster.receiveDamage(player.strength);
      if (monster.lifePoints <= 0 || player.lifePoints <= 0) break;
      player.receiveDamage(monster.strength);
    } while (monster.lifePoints > 0 || player.lifePoints > 0);
  });
};

export default fightToDeath;