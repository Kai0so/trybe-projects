const { expect } = require('chai');
const sinon = require('sinon');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');

describe('productController.create', () => {
  describe('Quando o produto não existe no banco', () => {
    const request = {};
    const response = {};
    const result = { id: 1, name: "produto", quantity: 10 };

    before(() => {
      sinon.stub(productService, 'create').returns(result);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(result);
      request.body = { name: "produto", quantity: 10 };
    });

    after(() => {
      productService.create.restore();
    });

    it('Retorna status 201', async () => {
      await productController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
    it('Retorna um objeto', async () => {
      await productController.create(request, response);
      expect(response.json()).to.be.an('object');
    });
    it('O objeto possui os atributos "id", "name" e "quantity"', async () => {
      await productController.create(request, response);
      expect(response.json()).to.have.all.keys('id', 'name', 'quantity');
    });
  });
});
