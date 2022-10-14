import { Router } from 'express';
import CarController from '../controllers/Car';
import CarModel from '../models/Car';
import CarService from '../services/Car';

const defaultRoute = '/cars';
const routeById = '/cars/:id';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post(defaultRoute, (req, res) => carController.create(req, res));
route.get(defaultRoute, (req, res) => carController.read(req, res));
route.get(routeById, (req, res) => carController.readOne(req, res));
route.put(routeById, (req, res) => carController.update(req, res));
route.delete(routeById, (req, res) => carController.delete(req, res));

export default route;