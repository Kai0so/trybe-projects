const frisby = require("frisby");
const mysql = require("mysql2/promise");
const restoreDb = require("./restoreDb");
require("dotenv").config();

describe("04-registerProduct", () => {
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

  describe("4 - Crie um endpoint para o cadastro de produtos", () => {
    it("Será validado que não é possível criar um produto com o mesmo nome de outro já existente", async () => {
      await frisby
        .post(`${url}/products/`, {
          name: "Martelo de Thor",
          quantity: 10,
        })
        .expect("status", 409)
        .then((response) => {
          const { json } = response;

          expect(Object.keys(json)).toContain("message");
          expect(json.message).toEqual("Product already exists");
        });
    });

    it("Será validado que é possível criar um produto com sucesso", async () => {
      await frisby
        .post(`${url}/products`, {
          name: "Arco do Gavião Arqueiro",
          quantity: 1,
        })
        .expect("status", 201)
        .then((response) => {
          const { json } = response;

          expect(json).toHaveProperty("id");
          expect(json).toHaveProperty("name");
          expect(json).toHaveProperty("quantity");
          expect(json.name).toBeDefined();
          expect(json.quantity).toBeDefined();
          expect(json.name).toEqual("Arco do Gavião Arqueiro");
          expect(json.quantity).toBe(1);
        });
    });
  });
});
