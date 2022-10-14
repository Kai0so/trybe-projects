const frisby = require("frisby");
const mysql = require("mysql2/promise");
const restoreDb = require("./restoreDb");
require("dotenv").config();

describe("07-registerSales", () => {
  const url = `http://localhost:${process.env.PORT}`;
  let connection;

  beforeAll(async () => {
    const {
      MYSQL_USER,
      MYSQL_PASSWORD,
      MYSQL_HOST
    } = process.env;

    connection = mysql.createPool({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
    });

    await restoreDb();
  });

  afterAll(async () => {
    await connection.execute("DROP DATABASE StoreManager")
    await connection.end();
  });

  describe("7 - Crie um endpoint para cadastrar vendas", () => {

    it("Será validado que é possível criar uma compra com sucesso", async () => {
      await frisby
        .post(`${url}/sales/`, [
          {
            productId: 3,
            quantity: 29,
          },
        ])
        .expect("status", 201)
        .then((response) => {
          const { json } = response;

          expect(json).toHaveProperty("id");
          expect(json).toHaveProperty("itemsSold");

          expect(json.itemsSold[0]).toHaveProperty("productId");
          expect(json.itemsSold[0]).toHaveProperty("quantity");

          expect(json.itemsSold[0].productId).toBeDefined();
          expect(json.itemsSold[0].quantity).toBeDefined();

          expect(json.itemsSold[0].productId).toBe(3);
          expect(json.itemsSold[0].quantity).toBe(29);
        });
    });

    it("Será validado que é possível criar várias compras com sucesso", async () => {
      await frisby
        .post(`${url}/sales/`, [
          {
            productId: 1,
            quantity: 9,
          },
          {
            productId: 2,
            quantity: 19,
          },
        ])
        .expect("status", 201)
        .then((response) => {
          const { json } = response;

          expect(json).toHaveProperty("id");
          expect(json).toHaveProperty("itemsSold");

          expect(json.itemsSold[0]).toHaveProperty("productId");
          expect(json.itemsSold[0]).toHaveProperty("quantity");

          expect(json.itemsSold[0].productId).toBeDefined();
          expect(json.itemsSold[0].quantity).toBeDefined();

          expect(json.itemsSold[0].productId).toBe(1);
          expect(json.itemsSold[0].quantity).toBe(9);

          expect(json.itemsSold[1]).toHaveProperty("productId");
          expect(json.itemsSold[1]).toHaveProperty("quantity");

          expect(json.itemsSold[1].productId).toBeDefined();
          expect(json.itemsSold[1].quantity).toBeDefined();

          expect(json.itemsSold[1].productId).toBe(2);
          expect(json.itemsSold[1].quantity).toBe(19);
        });
    });
  });
})
