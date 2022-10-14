import { Pool, ResultSetHeader } from 'mysql2/promise';

class OrdersModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll() {
    const query = `
    SELECT 
      o.id,
      o.userId,
      JSON_ARRAYAGG(p.id) AS productsIds
    FROM 
      Trybesmith.Products AS p
          INNER JOIN
      Trybesmith.Orders AS o ON o.id = p.orderId
    GROUP BY o.id
    ORDER BY o.userId`;
    const result = await this.connection.execute(query);
    const [rows] = result;
    return rows;
  }

  public async create(userId: number) {
    const query = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?);';
    const result = await this.connection.execute<ResultSetHeader>(query, [userId]);
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return insertId;
  }
}

export default OrdersModel;