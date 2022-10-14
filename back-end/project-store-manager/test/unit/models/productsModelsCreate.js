const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');

describe('productModel.create', () => {
  describe('Quando o produto é criado com sucesso', () => {
    const result = [{ id: 1, name: "produto", quantity: 10 }];
    const body = {name: "produto", quantity: 10};

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const createResult = await productModel.create(body);
      expect(createResult).to.be.an('object');
    });
    it('O objeto possui os atributos "id", "name" e "quantity"', async () => {
        const createResult = await productModel.create(body);
        expect(createResult).to.have.all.keys('id', 'name', 'quantity');
      });
  });
});