const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');
const { getAllResult } = require('../mocks/products');

describe('productService.getAll', () => {
  describe('Quando não existem produtos cadastrados', () => {
    const result = [];

    before(() => {
      sinon.stub(productModel, 'getAll').resolves(result);
    });

    after(() => {
      productModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const getResult = await productService.getAll();
      expect(getResult).to.be.an('array');
    });
    it('o array está vazio', async () => {
      const getResult = await productService.getAll();
      expect(getResult).to.be.empty;
    });
  });

  describe('Quando existem produtos cadastrados', () => {
    before(() => {
      sinon.stub(productModel, 'getAll').resolves(getAllResult);
    });

    after(() => {
      productModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const getResult = await productService.getAll();
      expect(getResult).to.be.an('array');
    });
    it('o array não está vazio', async () => {
      const getResult = await productService.getAll();
      expect(getResult).to.be.not.empty;
    });
  });
});