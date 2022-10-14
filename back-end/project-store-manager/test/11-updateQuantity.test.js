require("dotenv").config();
const frisby = require("frisby");
const mysql = require("mysql2/promise");
const restoreDb = require("./restoreDb");

describe("11-updateQuantity", () => {
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

  describe("11 - Atualize a quantidade de produtos", () => {
    let insertedId;

    it("Será validado que é possível atualizar a quantidade do produto ao fazer uma compra", async () => {
      await frisby
        .post(`${url}/sales/`, [
          {
            productId: 1,
            quantity: 5,
          },
        ])
        .expect("status", 201)
        .then((response) => {
          const { json } = response;

          insertedId = json.id;
        });

      await frisby
        .get(`${url}/products/1`)
        .expect("status", 200)
        .then((response) => {
          const { json } = response;

          expect(json.quantity).toBe(5);
        });
    });

    it("Será validado que é possível atualizar a quantidade do produto ao deletar uma compra", async () => {
      await frisby
        .delete(`${url}/sales/${insertedId}`)
        .expect("status", 204);

        await frisby
        .get(`${url}/products/1`)
        .expect("status", 200)
        .then((response) => {
          const { json } = response;

          expect(json.quantity).toBe(10);
        });
    });
  });
})
