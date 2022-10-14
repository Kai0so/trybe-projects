const { expect } = require('chai');
const sinon = require('sinon');
const saleController = require('../../../controllers/saleController');
const saleService = require('../../../services/saleService');

describe('saleController.getById', () => {
  describe('Quando a venda não existe no banco', () => {
    const request = {};
    const response = {};
    const result = { message: "Sale not found" };

    before(() => {
      sinon.stub(saleService, 'getById').returns(false);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(result);
      request.params = 9999;
    });

    after(() => {
      saleService.getById.restore();
    });

    it('Retorna status 404', async () => {
      await saleController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('Retorna um objeto', async () => {
      await saleController.getById(request, response);
      expect(response.json()).to.be.an('object');
    });
    it('O objeto contém a chave "message" com a mensagem "Sale not found"', async () => {
      await saleController.getById(request, response);
      expect(response.json()).to.have.property('message', 'Sale not found');
    });

  });
  describe('Quando a venda existe no banco', () => {
    const request = {};
    const response = {};
    const getByIdResult = [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]

    before(() => {
      sinon.stub(saleService, 'getById').returns(getByIdResult);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(getByIdResult);
      request.params = 1;
    });

    after(() => {
      saleService.getById.restore();
    });

    it('Retorna status 200', async () => {
      await saleController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('Retorna um array', async () => {
      await saleController.getById(request, response);
      expect(response.json()).to.be.an('array');
    });
    it('O array contém objetos', async () => {
        await saleController.getById(request, response);
        expect(response.json()[0]).to.be.an('object');
      });
    it('Os objetos possuem os atributos "date", "productId" e "quantity"', async () => {
      await saleController.getById(request, response);
      getByIdResult.forEach((sale) => {
        expect(sale).to.have.all.keys('date', 'productId', 'quantity');
      })
    });
  });
});
