const frisby = require("frisby");
const mysql = require("mysql2/promise");
const restoreDb = require("./restoreDb");
require("dotenv").config();

describe("06-deleteProduct", () => {
  const url = `http://localhost:${process.env.PORT}`;
  const INVALID_ID = 99999;
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

  describe("6 - Crie um endpoint para deletar um produto", () => {
    it("Será validado que é possível deletar um produto com sucesso", async () => {
      await frisby
        .delete(`${url}/products/3`)
        .expect("status", 204);

      await frisby
        .get(`${url}/products/3`)
        .then((response) => {
          const { json } = response;
  
          expect(Object.keys(json)).toContain("message");
          expect(json.message).toEqual("Product not found");
        });
    });

    it("Será validado que não é possível deletar um produto que não existe", async () => {
      await frisby
      .delete(`${url}/products/${INVALID_ID}`)
      .expect("status", 404)
      .then((response) => {
        const { json } = response;

        expect(Object.keys(json)).toContain("message");
        expect(json.message).toEqual("Product not found");
      });
    });
  });
});
