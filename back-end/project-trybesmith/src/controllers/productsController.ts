import { Request, Response } from 'express';
import ProductsService from '../services/productsService';

class ProductsController {
  constructor(private productService = new ProductsService()) { }

  public getAll = async (req: Request, res: Response) => {
    const result = await this.productService.getALl();
    res.status(200).json(result);
  };

  public create = async (req: Request, res: Response) => {
    const { name, amount }: { name: string; amount: string } = req.body;
    const product = { name, amount };
    const result = await this.productService.create(product);
    res.status(201).json(result);
  };
}

export default ProductsController;