import Race from './Race';

class Halfling extends Race {
  private _maxLifePoints = 60;
  private static _raceInstances = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    Halfling._raceInstances += 1;
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

export default Halfling;
