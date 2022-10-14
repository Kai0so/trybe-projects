const frisby = require("frisby");
const mysql = require("mysql2/promise");
const restoreDb = require("./restoreDb");
require("dotenv").config();

describe("05-editProduct", () => {
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

  describe("5 - Crie um endpoint para atualizar um produto", () => {
    it("Será validado que é possível atualizar um produto com sucesso", async () => {
      await frisby
        .put(`${url}/products/1`, {
          name: "Machado de Thor",
          quantity: 20,
        })
        .expect("status", 200)
        .then((response) => {
          const { json } = response;

          expect(json).toHaveProperty("id");
          expect(json).toHaveProperty("name");
          expect(json).toHaveProperty("quantity");
          expect(json.name).toBeDefined();
          expect(json.quantity).toBeDefined();
          expect(json.name).toEqual("Machado de Thor");
          expect(json.quantity).toBe(20);
        });
    });

    it("Será validado que não é possível atualizar um produto que não existe", async () => {
      await frisby
        .put(`${url}/products/${INVALID_ID}`, {
          name: "produto inexistente",
          quantity: 1,
        })
        .expect("status", 404)
        .then((response) => {
          const { json } = response;

          expect(Object.keys(json)).toContain("message");
          expect(json.message).toEqual("Product not found");
        });
    });
  });
});
