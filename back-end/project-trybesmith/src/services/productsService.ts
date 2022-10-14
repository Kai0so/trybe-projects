import connection from '../models/connection';
import ProductsModel from '../models/productsModel';
import Product from '../interfaces/product';

class ProductsService {
  public model: ProductsModel;

  constructor() {
    this.model = new ProductsModel(connection);
  }

  public async getALl(): Promise<Product[]> {
    const allProducts = await this.model.getAll();
    return allProducts;
  }

  public async create(product: Product): Promise<Product> {
    const createdProduct = await this.model.create(product);
    return createdProduct;
  }
}

export default ProductsService;