const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

describe('productService.deleteProduct', () => {
  describe('Quando o produto não existe no banco', () => {
    const result = false;
    const params = 9999;

    before(() => {
      sinon.stub(productModel, 'deleteProduct').resolves(result);
      sinon.stub(productModel, 'getById').resolves(result);
    });

    after(() => {
      productModel.deleteProduct.restore();
      productModel.getById.restore();
    });

    it('retorna "false"', async () => {
      const deleteResult = await productService.deleteProduct(params);
      expect(deleteResult).to.be.false;
    });
  });

  describe('Quando o produto existe no banco', () => {
    const params = 1;
    const result = {};
    const resultGetById = {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10
    };

    before(() => {
      sinon.stub(productModel, 'deleteProduct').resolves(result);
      sinon.stub(productModel, 'getById').resolves(resultGetById);
    });

    after(() => {
      productModel.deleteProduct.restore();
      productModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const deleteResult = await productService.deleteProduct(params);
      expect(deleteResult).to.be.an('object');
    });
    it('o objeto está vazio', async () => {
      const deleteResult = await productService.deleteProduct(params);
      expect(deleteResult).to.be.empty;
    });
  });
});