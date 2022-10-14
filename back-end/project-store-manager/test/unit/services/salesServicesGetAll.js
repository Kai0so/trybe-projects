const { expect } = require('chai');
const sinon = require('sinon');
const saleModel = require('../../../models/saleModel');
const saleService = require('../../../services/saleService');
const { getAllResult } = require('../mocks/sales');

describe('saleService.getAll', () => {
  describe('Quando não existem vendas cadastradas', () => {
    const result = [];

    before(() => {
      sinon.stub(saleModel, 'getAll').resolves(result);
    });

    after(() => {
      saleModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const getResult = await saleService.getAll();
      expect(getResult).to.be.an('array');
    });
    it('o array está vazio', async () => {
      const getResult = await saleService.getAll();
      expect(getResult).to.be.empty;
    });
  });

  describe('Quando existem vendas cadastradas', () => {

    before(() => {
      sinon.stub(saleModel, 'getAll').resolves(getAllResult);
    });

    after(() => {
      saleModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const getResult = await saleService.getAll();
      expect(getResult).to.be.an('array');
    });
    it('o array não está vazio', async () => {
      const getResult = await saleService.getAll();
      expect(getResult).to.be.not.empty;
    });
  });
});