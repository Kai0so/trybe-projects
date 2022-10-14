import { IService } from '../interfaces/IService';
import ICar, { CarZodSchema } from '../interfaces/CarZodSchema';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;
  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._car.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    const result = this._car.read();
    return result;
  }

  public async readOne(_id: string): Promise<ICar> {
    if (_id.length !== 24) throw new Error(ErrorTypes.InvalidMongoId);
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id: string, obj: ICar): Promise<ICar> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const updatedCar = await this._car.update(_id, parsed.data);
    if (!updatedCar) throw new Error(ErrorTypes.EntityNotFound);
    return updatedCar;
  }

  public async delete(_id: string): Promise<ICar> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    const deletedCar = await this._car.delete(_id);
    if (!deletedCar) throw new Error(ErrorTypes.EntityNotFound);
    return deletedCar;
  }
}

export default CarService;