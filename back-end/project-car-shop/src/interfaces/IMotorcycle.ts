import { IVehicle } from './IVehicle';

export interface IMotorcycle extends IVehicle {
  category: 'Street' | 'Custom' | 'Trail',
  engineCapacity: number,
}