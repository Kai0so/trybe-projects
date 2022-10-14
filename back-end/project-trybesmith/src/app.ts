import express from 'express';
import ProductsController from './controllers/productsController';
import UsersController from './controllers/usersController';
import OrdersController from './controllers/ordersController';
import validateLogin from './middlewares/validations/loginValidation';
import validateProduct from './middlewares/validations/productsValidation';
import validateUser from './middlewares/validations/usersValidation';
import validateToken from './middlewares/validations/tokenValidation';
import validateOrder from './middlewares/validations/ordersValidation';
import LoginController from './controllers/loginController';

const app = express();
app.use(express.json());

const productsController = new ProductsController();
const usersController = new UsersController();
const ordersController = new OrdersController();
const loginController = new LoginController();

app.get('/products', productsController.getAll);
app.get('/orders', ordersController.getAll);

app.post('/products', validateProduct, productsController.create);
app.post('/users', validateUser, usersController.create);
app.post('/login', validateLogin, loginController.login);
app.post('/orders', validateToken, validateOrder, ordersController.create);

export default app;
