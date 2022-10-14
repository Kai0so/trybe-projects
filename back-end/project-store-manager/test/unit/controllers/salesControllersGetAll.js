const { expect } = require('chai');
const sinon = require('sinon');
const saleController = require('../../../controllers/saleController');
const saleService = require('../../../services/saleService');
const { getAllResult } = require('../mocks/sales');

describe('saleController.getAll', () => {
  describe('Quando não existem vendas cadastradas', () => {
    const request = {};
    const response = {};
    const result = [];

    before(() => {
      sinon.stub(saleService, 'getAll').returns(result);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(result);
    });

    after(() => {
      saleService.getAll.restore();
    });

    it('Retorna status 200', async () => {
      await saleController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('Retorna um array', async () => {
      await saleController.getAll(request, response);
      expect(response.json()).to.be.an('array');
    });
    it('O array está vazio', async () => {
      await saleController.getAll(request, response);
      expect(response.json()).to.be.empty;
    });
  });

  describe('Quando existem vendas cadastradas', () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(saleService, 'getAll').returns(getAllResult);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(getAllResult);
    });

    after(() => {
      saleService.getAll.restore();
    });

    it('Retorna status 200', async () => {
      await saleController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('Retorna um array', async () => {
      await saleController.getAll(request, response);
      expect(response.json()).to.be.an('array');
    });
    it('O array não está vazio', async () => {
      await saleController.getAll(request, response);
      expect(response.json()).to.be.not.empty;
    });
  });
});