import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Car';
import { carMock, carMockUpdate, createdCarMock, invalidCarId, notFoundId, readAllMock, validCarId } from '../mocks/carMock';
import CarService from '../../../services/Car';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import { ICar } from '../../../interfaces/ICar';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(createdCarMock);
  });

  after(() => {
    sinon.restore();
  })

  describe('Criando um carro', () => {
    it('Sucesso na criação', async () => {
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.deep.equal(createdCarMock);
    });

    it('Falha na criação', async () => {
      let err: any;
      try {
        await carService.create({});
      } catch (error) {
        err = error;
      }
      expect(err).to.be.instanceOf(ZodError);
    });
  })


  describe('Listando todos os carros', () => {
    it('Quando há carros cadastrados', async () => {
      sinon.stub(carModel, 'read').resolves(readAllMock);
      const allCars = await carService.read();
      expect(allCars).to.be.deep.equal(readAllMock);
      sinon.restore();
    });

    it('Quando não há carros cadastrados', async () => {
      sinon.stub(carModel, 'read').resolves([]);
      const allCars = await carService.read();
      expect(allCars).to.be.deep.equal([]);
      sinon.restore();
    });
  })

  describe('Listando um carro pelo id', () => {
    it('Sucesso na listagem', async () => {
      sinon.stub(carModel, 'readOne').resolves(createdCarMock);
      const car = await carService.readOne(validCarId);
      expect(car).to.be.deep.equal(createdCarMock);
      sinon.restore();
    });

    it('Caso o id informado possua menos que 24 caracteres', async () => {
      let error: any;
      sinon.stub(carModel, 'readOne').resolves(null);
      try {
        await carService.readOne(invalidCarId);
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      sinon.restore();
    });

    it('Caso o id informado seja inválido', async () => {
      let error: any;
      sinon.stub(carModel, 'readOne').resolves(null);
      try {
        await carService.readOne(notFoundId);
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      sinon.restore();
    });
  })

  describe('Atualizando um carro', () => {
    it('Sucesso na atualização', async () => {
      sinon.stub(carModel, 'update').resolves(carMockUpdate);
      const updatedCar = await carService.update(validCarId, carMockUpdate);
      expect(updatedCar).to.be.deep.equal(carMockUpdate);
      sinon.restore();
    });

    it('Caso o id informado possua menos que 24 caracteres', async () => {
      let error: any;
      try {
        await carService.update(invalidCarId, carMockUpdate);
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    });

    it('Caso o id informado seja inválido', async () => {
      let error: any;
      sinon.stub(carModel, 'update').resolves(null);
      try {
        await carService.update(notFoundId, carMockUpdate);
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      sinon.restore();
    });

    it('Falha na validação dos campos', async () => {
      let err: any;
      try {
        await carService.update(validCarId, {} as ICar);
      } catch (error) {
        err = error;
      }
      expect(err).to.be.instanceOf(ZodError);
    });
  })


  describe('Excluindo um carro', () => {
    it('Sucesso na exclusão', async () => {
      sinon.stub(carModel, 'delete').resolves({} as ICar);
      const deletedCar = await carService.delete(validCarId);
      expect(deletedCar).to.be.deep.equal({});
      sinon.restore();
    });

    it('Caso o id informado possua menos que 24 caracteres', async () => {
      let error: any;
      try {
        await carService.delete(invalidCarId);
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    });

    it('Caso o id informado seja inválido', async () => {
      let error: any;
      sinon.stub(carModel, 'delete').resolves(null);
      try {
        await carService.delete(notFoundId);
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      sinon.restore();
    });
  })
});
