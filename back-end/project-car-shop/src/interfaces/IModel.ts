export interface IModel<T> {
  create(obj: T): Promise<T>,
  read(): Promise<T[]>,
  readOne(str: string): Promise<T | null>,
  update(str: string, obj: T): Promise<T | null>,
  delete(str: string): Promise<T | null>,
}