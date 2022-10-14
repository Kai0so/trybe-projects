const { expect } = require('chai');
const sinon = require('sinon');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');

describe('productController.getById', () => {
  describe('Quando o produto não existe no banco', () => {
    const request = {};
    const response = {};
    const result = { message: "Product not found" };

    before(() => {
      sinon.stub(productService, 'getById').returns(false);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(result);
      request.params = 9999;
    });

    after(() => {
      productService.getById.restore();
    });

    it('Retorna status 404', async () => {
      await productController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('Retorna um objeto', async () => {
      await productController.getById(request, response);
      expect(response.json()).to.be.an('object');
    });
    it('O objeto contém a chave "message" com a mensagem "Product not found"', async () => {
      await productController.getById(request, response);
      expect(response.json()).to.have.property('message', 'Product not found');
    });

  });
  describe('Quando o produto existe no banco', () => {
    const request = {};
    const response = {};
    const getByIdResult = {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10
    };

    before(() => {
      sinon.stub(productService, 'getById').returns(getByIdResult);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(getByIdResult);
      request.params = 1;
    });

    after(() => {
      productService.getById.restore();
    });

    it('Retorna status 200', async () => {
      await productController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('Retorna um objeto', async () => {
      await productController.getById(request, response);
      expect(response.json()).to.be.an('object');
    });
    it('O objeto possui os atributos "id", "name" e "quantity"', async () => {
      await productController.getById(request, response);
      expect(response.json()).to.have.all.keys('id', 'name', 'quantity');
    });
  });
});
