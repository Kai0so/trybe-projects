import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import OrdersModel from '../models/ordersModel';
import ProductsModel from '../models/productsModel';

class OrdersService {
  public model: OrdersModel;

  public productsModel: ProductsModel;

  constructor() {
    this.model = new OrdersModel(connection);
    this.productsModel = new ProductsModel(connection);
  }

  public async getAll() {
    const allProducts = await this.model.getAll();
    return allProducts;
  }

  public async create(productsIds: number[], token: string) {
    const decoded = jwt.decode(JSON.parse(token)) as jwt.JwtPayload;
    const { data } = decoded;
    const userId = data[0].id;
    const createdOrder = await this.model.create(userId);
    productsIds.forEach((product) => this.productsModel.update(createdOrder, product));
    return { userId, productsIds };
  }
}

export default OrdersService;