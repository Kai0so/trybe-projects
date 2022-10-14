import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleService from '../services/Motorcycle';

const defaultRoute = '/motorcycles';
const routeById = '/motorcycles/:id';

const route = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

route.post(defaultRoute, (req, res) => motorcycleController.create(req, res));
route.get(defaultRoute, (req, res) => motorcycleController.read(req, res));
route.get(routeById, (req, res) => motorcycleController.readOne(req, res));
route.put(routeById, (req, res) => motorcycleController.update(req, res));
route.delete(routeById, (req, res) => motorcycleController.delete(req, res));

export default route;