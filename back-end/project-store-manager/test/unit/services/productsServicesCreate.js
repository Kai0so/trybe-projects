const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

describe('productService.create', () => {
  describe('Quando o produto é cadastrado com sucesso', () => {
    const result = { "id": 1, "name": "produto", "quantity": 10 };
    const body = { name: "produto", quantity: 10 }

    before(() => {
      sinon.stub(productModel, 'create').resolves(result);
    });

    after(() => {
      productModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const createResult = await productService.create(body);
      expect(createResult).to.be.an('object');
    });
    it('O objeto possui os atributos "id", "name" e "quantity"', async () => {
        const createResult = await productService.create(body);
        expect(createResult).to.have.all.keys('id', 'name', 'quantity');
      });
  });
});