require("dotenv").config();
const frisby = require("frisby");
const mysql = require("mysql2/promise");
const restoreDb = require("./restoreDb");

describe("12-validatesQuantity", () => {
  const url = `http://localhost:${process.env.PORT}`;
  let connection;

  beforeAll(async () => {
    const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env;

    connection = mysql.createPool({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
    });

    await restoreDb();
  });

  afterAll(async () => {
    await connection.execute("DROP DATABASE StoreManager");
    await connection.end();
  });

  describe("12 - Valide a quantidade de produtos", () => {
    it("Será validado que o estoque do produto nunca fique com a quantidade menor que zero", async () => {

      await frisby
        .post(`${url}/sales/`, [
          {
            productId: 1,
            quantity: 500,
          },
        ])
        .expect("status", 422)
        .then((responseSales) => {
          const { json } = responseSales;
          expect(json.message).toBe("Such amount is not permitted to sell");
        });
    });
  });
})
