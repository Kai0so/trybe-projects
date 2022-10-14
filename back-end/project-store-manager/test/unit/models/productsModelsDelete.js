const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');

describe('productModel.deleteProduct', () => {
  describe('Quando o produto é deletado com sucesso', () => {
    const result = {};

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const getResult = await productModel.deleteProduct();
      expect(getResult).to.be.an('object');
    });
    it('o objeto está vazio', async () => {
      const getResult = await productModel.deleteProduct();
      expect(getResult).to.be.empty;
    });
  });
});