const frisby = require("frisby");
const mysql = require("mysql2/promise");
const restoreDb = require("./restoreDb");
require("dotenv").config();

describe("08-updateSales", () => {
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

  describe("8 - Crie um endpoint para atualizar uma venda", () => {
    it("Será validado que é possível atualizar uma venda com sucesso", async () => {
      await frisby
        .put(`${url}/sales/2`, [
          {
            productId: 3,
            quantity: 14,
          },
        ])
        .expect("status", 200)
        .then((response) => {
          const { json } = response;

          expect(json).toHaveProperty("saleId");
          expect(json).toHaveProperty("itemUpdated");

          expect(json.itemUpdated[0]).toHaveProperty("productId");
          expect(json.itemUpdated[0]).toHaveProperty("quantity");

          expect(json.itemUpdated[0].productId).toBeDefined();
          expect(json.itemUpdated[0].quantity).toBeDefined();

          expect(json.itemUpdated[0].productId).toBe(3);
          expect(json.itemUpdated[0].quantity).toBe(14);
        });

        await frisby
          .get(`${url}/sales/2`)
          .expect("status", 200)
          .then((response) => {
            const { json } = response;
  
            expect(json.length).toBe(1);
  
            expect(json[0].productId).toBe(3);
            expect(json[0].quantity).toBe(14);
          });
    });
  });
})
