const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);
require("dotenv").config();

jest.mock('mysql2/promise', () => {
	const connectionError = new Error("No requisito 3, sua aplicação não deve acessar o banco de dados até que o formato de name e quantity dos todos produtos e vendas sejam validados");
	const connectionMock = jest.fn().mockImplementation(() => ({
		execute: jest.fn().mockRejectedValue(connectionError),
		query: jest.fn().mockRejectedValue(connectionError),
	}))

	return {
		createPool: connectionMock,
		createConnection: connectionMock, createPoolCluster: connectionMock
	}
});
describe("03-validations", () => {

	describe("3 - Realiza validações nos produtos e nas vendas", () => {
		it("quando cadastrar um produto será validado que o campo name está presente no body", async () => {
			await request
				.post(`/products`,)
				.send({
					quantity: 2,
				})
				.expect(400)
				.then((response) => {
					const { body } = response;
					expect(Object.keys(body)).toContain("message");
					expect(body.message).toEqual('"name" is required');
				});
		});

		it("quando cadastrar um produto será validado que o campo name possui 5 ou mais caracteres", async () => {
			await request
				.post('/products',)
				.send({
					name: "Arco",
					quantity: 100,
				})
				.expect(422)
				.then((response) => {
					const { body } = response;

					expect(Object.keys(body)).toContain("message");
					expect(body.message).toEqual('"name" length must be at least 5 characters long');
				});
		});

		it("quando cadastrar um produto será validado que o campo quantity está presente no body", async () => {
			await request
				.post('/products/',)
				.send({
					name: "Olho de Thundera",
				})
				.expect(400)
				.then((response) => {
					const { body } = response;

					expect(Object.keys(body)).toContain("message");
					expect(body.message).toEqual('"quantity" is required');
				});
		});

		it("quando cadastrar um produto será validado que o campo quantity é um número inteiro maior que zero", async () => {
			await request
				.post('/products',)
				.send({
					name: "Produto do Batista",
					quantity: -1,
				})
				.expect(422)
				.then((response) => {
					const { body } = response;

					expect(Object.keys(body)).toContain("message");
					expect(body.message).toEqual('"quantity" must be greater than or equal to 1');
				});
		});
	});

	// atualizações dos produtos
	it("quando atualizar um produto será validado que o campo name possui 5 ou mais caracteres", async () => {
		await request
			.put('/products/1',)
			.send({
				name: "Mar",
				quantity: 10,
			})
			.expect(422)
			.then((response) => {
				const { body } = response;

				expect(Object.keys(body)).toContain("message");
				expect(body.message).toEqual('"name" length must be at least 5 characters long');
			});
	});

	it("quando atualizar um produto será validado que o campo quantity está presente no body", async () => {
		await request
			.put('/products/1',)
			.send({
				name: "Olho de Thundera",
			})
			.expect(400)
			.then((response) => {
				const { body } = response;

				expect(Object.keys(body)).toContain("message");
				expect(body.message).toEqual('"quantity" is required');
			});
	});

	it("quando atualizar um produto será validado que o quantity é um número inteiro maior que zero", async () => {
		await request
			.put('/products/1',)
			.send({
				name: "Martelo de Thor",
				quantity: 0,
			})
			.expect(422)
			.then((response) => {
				const { body } = response;

				expect(Object.keys(body)).toContain("message");
				expect(body.message).toEqual('"quantity" must be greater than or equal to 1');
			});
	});

	// registro das vendas
	it("quando cadastrar uma venda será validado que o campo productId está presente no body", async () => {
		await request
			.post('/sales',)
			.send([
				{
					productId: 1,
					quantity: 1,
				},
				{
					quantity: 2,
				}
			])
			.expect(400)
			.then((response) => {
				const { body } = response;

				expect(Object.keys(body)).toContain("message");
				expect(body.message).toEqual('"productId" is required');
			});
	});

	it("quando cadastrar uma venda será validado que o campo quantity está presente no body", async () => {
		await request
			.post('/sales/',)
			.send([
				{
					productId: 1,
					quantity: 1,
				},
				{
					productId: 1,
				},
			])
			.expect(400)
			.then((response) => {
				const { body } = response;

				expect(Object.keys(body)).toContain("message");
				expect(body.message).toBe('"quantity" is required');
			});
	});

	it("quando cadastrar uma venda será validado que o campo quantity é um número inteiro maior que zero", async () => {
		await request
			.post('/sales',)
			.send([
				{
					productId: 1,
					quantity: 1,
				},
				{
					productId: 1,
					quantity: -1,
				},
			])
			.expect(422)
			.then((response) => {
				const { body } = response;

				expect(Object.keys(body)).toContain("message");
				expect(body.message).toBe('"quantity" must be greater than or equal to 1');
			});
	});

	// atualizações das vendas
	it("quando atualizar uma venda Será validado que o campo productId está presente no body", async () => {
		await request
			.put('/sales/1')
			.send([
				{
					productId: 1,
					quantity: 1,
				},
				{
					quantity: 10
				},
			])
			.expect(400)
			.then((response) => {
				const { body } = response;

				expect(Object.keys(body)).toContain("message");
				expect(body.message).toBe('"productId" is required');
			});
	});

	it("quando atualizar uma venda Será validado que o campo quantity está presente no body", async () => {
		await request
			.put('/sales/1')
			.send([
				{
					productId: 1,
					quantity: 1,
				},
				{
					productId: 1,
				},
			])
			.expect(400)
			.then((response) => {
				const { body } = response;

				expect(Object.keys(body)).toContain("message");
				expect(body.message).toBe('"quantity" is required');
			});
	});

	it("quando atualizar uma venda Será validado que o campo quantity é um número inteiro maior do que zero", async () => {
		await request
			.put('/sales/1')
			.send([
				{
					productId: 1,
					quantity: 1,
				},
				{
					productId: 1,
					quantity: -1,
				},
			])
			.expect(422)
			.then((response) => {
				const { body } = response;

				expect(Object.keys(body)).toContain("message");
				expect(body.message).toBe('"quantity" must be greater than or equal to 1');
			});
	});
});
