const { expect } = require('chai');
const sinon = require('sinon');
const saleController = require('../../../controllers/saleController');
const saleService = require('../../../services/saleService');

describe('saleController.create', () => {
  describe('Quando a venda é cadastrada com sucesso', () => {
    const request = {};
    const response = {};
    const result = {
        "id": 1,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 3
          }
        ]
      };
    

    before(() => {
      sinon.stub(saleService, 'create').returns(result);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(result);
      request.body =  [
        {
          "productId": 1,
          "quantity": 3
        }
      ];
    });

    after(() => {
      saleService.create.restore();
    });

    it('Retorna status 201', async () => {
      await saleController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
    it('Retorna um objeto', async () => {
      await saleController.create(request, response);
      expect(response.json()).to.be.an('object');
    });
    it('O objeto possui os atributos "id" e "itemsSold"', async () => {
      await saleController.create(request, response);
      expect(response.json()).to.have.all.keys('id', 'itemsSold');
    });
    it('O atributo "itemsSold" é um array', async () => {
        await saleController.create(request, response);
        expect(response.json().itemsSold).to.be.an('array');
      });
      it('O array não está vazio', async () => {
        await saleController.create(request, response);
        expect(response.json().itemsSold).to.be.not.empty;
      });
  });
});
