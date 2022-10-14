const frisby = require("frisby");
const mysql = require("mysql2/promise");
const restoreDb = require("./restoreDb");
require("dotenv").config();

describe("02-list", () => {
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

  describe("2 - Crie endpoints para listar os produtos e as vendas", () => {
    it("Será validado que todos produtos estão sendo retornados", async () => {
      await frisby
        .get(`${url}/products`)
        .expect("status", 200)
        .then((response) => {
          let { json } = response;

          expect(json[0]).toHaveProperty("id");
          expect(json[0]).toHaveProperty("name");
          expect(json[0]).toHaveProperty("quantity");
          expect(json[0].name).toEqual("Martelo de Thor");
          expect(json[0].quantity).toBeDefined();

          expect(json[1]).toHaveProperty("id");
          expect(json[1]).toHaveProperty("name");
          expect(json[1]).toHaveProperty("quantity");
          expect(json[1].name).toEqual("Traje de encolhimento");
          expect(json[1].quantity).toBeDefined();

          expect(json[2]).toHaveProperty("id");
          expect(json[2]).toHaveProperty("name");
          expect(json[2]).toHaveProperty("quantity");
          expect(json[2].name).toEqual("Escudo do Capitão América");
          expect(json[2].quantity).toBeDefined();
        });
    });

    it("Será validado que é possível listar um determinado produto", async () => {
      await frisby
        .get(`${url}/products/1`)
        .expect("status", 200)
        .then((response) => {
          const { json } = response;

          expect(json).toHaveProperty("id");
          expect(json).toHaveProperty("name");
          expect(json).toHaveProperty("quantity");

          expect(json.name).toEqual("Martelo de Thor");
          expect(json.quantity).toBeDefined();
        });
    });

    it("Será validado que não é possível listar um produto que não existe", async () => {
      await frisby
        .get(`${url}/products/${INVALID_ID}`)
        .expect("status", 404)
        .then((response) => {
          const { json } = response;

          expect(Object.keys(json)).toContain("message");
          expect(json.message).toEqual("Product not found");
        });
    });

    it("Será validado que todas as vendas estão sendo retornadas", async () => {
      await frisby
        .get(`${url}/sales/`)
        .expect("status", 200)
        .then((response) => {
          const { json } = response;

          expect(json.length).toBe(3);

          expect(json[0]).toHaveProperty("saleId");
          expect(json[0]).toHaveProperty("productId");
          expect(json[0]).toHaveProperty("quantity");
          expect(json[0]).toHaveProperty("date");

          expect(json[0].saleId).toBeDefined();
          expect(json[0].productId).toBeDefined();
          expect(json[0].quantity).toBeDefined();
          expect(json[0].date).toBeDefined();

          expect(json[1]).toHaveProperty("saleId");
          expect(json[1]).toHaveProperty("productId");
          expect(json[1]).toHaveProperty("quantity");
          expect(json[1]).toHaveProperty("date");

          expect(json[1].saleId).toBeDefined();
          expect(json[1].productId).toBeDefined();
          expect(json[1].quantity).toBeDefined();
          expect(json[1].date).toBeDefined();

          expect(json[2]).toHaveProperty("saleId");
          expect(json[2]).toHaveProperty("productId");
          expect(json[2]).toHaveProperty("quantity");
          expect(json[2]).toHaveProperty("date");

          expect(json[2].saleId).toBeDefined();
          expect(json[2].productId).toBeDefined();
          expect(json[2].quantity).toBeDefined();
          expect(json[2].date).toBeDefined();
        });
    });

    it("Será validado que é possível listar uma determinada venda", async () => {
      await frisby
        .get(`${url}/sales/1`)
        .expect("status", 200)
        .then((response) => {
          const { json } = response;

          expect(json.length).toBe(2);
          expect(json[0]).not.toHaveProperty("id");
          expect(json[0]).not.toHaveProperty("saleId");

          expect(json[0]).toHaveProperty("productId");
          expect(json[0]).toHaveProperty("quantity");
          expect(json[0]).toHaveProperty("date");

          expect(json[0].productId).toBeDefined();
          expect(json[0].quantity).toBeDefined();
          expect(json[0].date).toBeDefined();

          expect(json[1]).not.toHaveProperty("id");
          expect(json[1]).not.toHaveProperty("saleId");

          expect(json[1]).toHaveProperty("productId");
          expect(json[1]).toHaveProperty("quantity");
          expect(json[1]).toHaveProperty("date");

          expect(json[1].productId).toBeDefined();
          expect(json[1].quantity).toBeDefined();
          expect(json[1].date).toBeDefined();
        });
    });

    it("Será validado que não é possível listar uma venda inexistente", async () => {
      await frisby
        .get(`${url}/sales/${INVALID_ID}`)
        .expect("status", 404)
        .then((response) => {
          const { json } = response;

          expect(Object.keys(json)).toContain("message");
          expect(json.message).toEqual("Sale not found");
        });
    });
  });
});
