const { expect } = require('chai');
const sinon = require('sinon');
const saleModel = require('../../../models/saleModel');
const connection = require('../../../models/connection');

describe('saleModel.create', () => {
  describe('Quando a venda é criada com sucesso', () => {
    const result = [{
      "id": 1,
      "itemsSold": [
        {
          "saleId": 1,
          "quantity": 3
        }
      ]
    }]
    const body = [
      {
        "saleId": 1,
        "quantity": 3
      }
    ]

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const createResult = await saleModel.create(body);
      expect(createResult).to.be.an('object');
    });
    it('O objeto possui os atributos "id" e "itemsSold"', async () => {
      const createResult = await saleModel.create(body);
      expect(createResult).to.have.all.keys('id', 'itemsSold');
    });
    it('O atributo itemsSold é um array', async () => {
      const createResult = await saleModel.create(body);
      expect(createResult.itemsSold).to.be.an('array');
    });
    it('O array não está vazio', async () => {
      const createResult = await saleModel.create(body);
      expect(createResult.itemsSold).to.be.not.empty;
    });
  });
});