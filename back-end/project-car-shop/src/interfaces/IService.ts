export interface IService<T> {
  create(obj: unknown): Promise<T>,
  read(): Promise<T[]>,
  readOne(str: string): Promise<T | null>,
  update(str: string, obj: unknown): Promise<T | null>,
  delete(str: string): Promise<T | null>,
}