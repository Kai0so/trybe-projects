import Fighter from './Fighter';

interface SimpleFighter {
  lifePoints: number;
  strength: number;

  attack(enemy: Fighter | SimpleFighter): void;
  receiveDamage(attackPoints: number): number;
}

export default SimpleFighter;