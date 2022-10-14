import Race from './Race';

class Elf extends Race {
  private _maxLifePoints = 99;
  private static _raceInstances = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    Elf._raceInstances += 1;
  }

  static createdRacesInstances(): number {
    return this._raceInstances;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  get name(): string {
    return this.name;
  }

  get dexterity(): number {
    return this.dexterity;
  }
}

export default Elf;
