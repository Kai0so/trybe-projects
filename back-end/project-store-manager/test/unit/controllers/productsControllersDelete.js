const { expect } = require('chai');
const sinon = require('sinon');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');

describe('productController.deleteProduct', () => {
  describe('Quando o produto não existe no banco', () => {
    const request = {};
    const response = {};
    const result = { message: "Product not found" };


    before(() => {
      sinon.stub(productService, 'deleteProduct').returns(false);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(result);
      request.params = 9999;
    });

    after(() => {
      productService.deleteProduct.restore();
    });

    it('Retorna status 404', async () => {
      await productController.deleteProduct(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('Retorna um objeto', async () => {
      await productController.deleteProduct(request, response);
      expect(response.json()).to.be.an('object');
    });
    it('O objeto contém a chave "message" com a mensagem "Product not found"', async () => {
      await productController.deleteProduct(request, response);
      expect(response.json()).to.have.property('message', 'Product not found');
    });

  });
});
