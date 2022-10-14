const { expect } = require('chai');
const sinon = require('sinon');
const saleModel = require('../../../models/saleModel');
const saleService = require('../../../services/saleService');

describe('saleService.create', () => {
  describe('Quando as vendas são cadastradas com sucesso', () => {
    const result = {
      "id": 1,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 3
        }
      ]
    };
    const body = [
      {
        "productId": 1,
        "quantity": 3
      }
    ];

    before(() => {
      sinon.stub(saleModel, 'create').resolves(result);
    });

    after(() => {
      saleModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const createResult = await saleService.create(body);
      expect(createResult).to.be.an('object');
    });
    it('O objeto possui os atributos "id" e "itemsSold"', async () => {
      const createResult = await saleService.create(body);
      expect(createResult).to.have.all.keys('id', 'itemsSold');
    });
    it('O atributo itemsSold é um array', async () => {
      const createResult = await saleService.create(body);
      expect(createResult.itemsSold).to.be.an('array');
    });
    it('O array não está vazio', async () => {
      const createResult = await saleService.create(body);
      expect(createResult.itemsSold).to.be.not.empty;
    });
  });
});