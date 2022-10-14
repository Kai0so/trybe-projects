const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');
const { getAllResult } = require('../mocks/products');

describe('productModel.getAll', () => {
  describe('Quando não existem produtos cadastrados', () => {
    const result = [[]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const getResult = await productModel.getAll();
      expect(getResult).to.be.an('array');
    });
    it('o array está vazio', async () => {
      const getResult = await productModel.getAll();
      expect(getResult).to.be.empty;
    });
  });

  describe('Quando existem produtos cadastrados', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves(getAllResult);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const getResult = await productModel.getAll();
      expect(getResult).to.be.an('array');
    });
    it('o array não está vazio', async () => {
      const getResult = await productModel.getAll();
      expect(getResult).to.be.not.empty;
    });
  });
});