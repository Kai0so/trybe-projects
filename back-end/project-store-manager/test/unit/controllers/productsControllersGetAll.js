const { expect } = require('chai');
const sinon = require('sinon');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');
const { getAllResult } = require('../mocks/products');

describe('productController.getAll', () => {
  describe('Quando não existem produtos cadastrados', () => {
    const request = {};
    const response = {};
    const result = [];

    before(() => {
      sinon.stub(productService, 'getAll').returns(result);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(result);
    });

    after(() => {
      productService.getAll.restore();
    });

    it('Retorna status 200', async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('Retorna um array', async () => {
      await productController.getAll(request, response);
      expect(response.json()).to.be.an('array');
    });
    it('O array está vazio', async () => {
      await productController.getAll(request, response);
      expect(response.json()).to.be.empty;
    });
  });

  describe('Quando existem produtos cadastrados', () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(productService, 'getAll').returns(getAllResult);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(getAllResult);
    });

    after(() => {
      productService.getAll.restore();
    });

    it('Retorna status 200', async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('Retorna um array', async () => {
      await productController.getAll(request, response);
      expect(response.json()).to.be.an('array');
    });
    it('O array não está vazio', async () => {
      await productController.getAll(request, response);
      expect(response.json()).to.be.not.empty;
    });
  });

});
