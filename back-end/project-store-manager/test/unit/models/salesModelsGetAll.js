const { expect } = require('chai');
const sinon = require('sinon');
const saleModel = require('../../../models/saleModel');
const connection = require('../../../models/connection');
const { getAllResult } = require('../mocks/sales');

describe('saleModel.getAll', () => {
  describe('Quando não existem vendas cadastradas', () => {
    const result = [[]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const getResult = await saleModel.getAll();
      expect(getResult).to.be.an('array');
    });
    it('o array está vazio', async () => {
      const getResult = await saleModel.getAll();
      expect(getResult).to.be.empty;
    });
  });

  describe('Quando existem vendas cadastradas', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves(getAllResult)
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const getResult = await saleModel.getAll();
      expect(getResult).to.be.an('array');
    });
    it('o array não está vazio', async () => {
      const getResult = await saleModel.getAll();
      expect(getResult).to.be.not.empty;
    });
  });
});