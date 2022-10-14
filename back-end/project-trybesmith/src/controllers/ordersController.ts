import { Request, Response } from 'express';
import OrdersService from '../services/ordersService';

class OrdersController {
  constructor(private ordersService = new OrdersService()) { }

  public getAll = async (req: Request, res: Response) => {
    const result = await this.ordersService.getAll();
    res.status(200).json(result);
  };

  public create = async (req: Request, res: Response) => {
    const { productsIds }: { productsIds: number[]; } = req.body;
    const token = JSON.stringify(req.headers.authorization);
    const result = await this.ordersService.create(productsIds, token);
    res.status(201).json(result);
  };
}
export default OrdersController;