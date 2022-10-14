const { validateLogin } = require('./middlewares/validations/loginValidation');
const { loginAuth } = require('./controllers/loginController');
const { validateUserCreation } = require('./middlewares/validations/userValidation');
const { validateToken } = require('./middlewares/validations/tokenValidation');
const { validateCategoryCreation } = require('./middlewares/validations/categoryValidation');
const User = require('./controllers/userController');
const Category = require('./controllers/categoryController');
const Post = require('./controllers/postController');

require('dotenv').config();
const app = require('./api');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', validateLogin, loginAuth);
app.post('/user', validateUserCreation, User.create);
app.post('/categories', validateToken, validateCategoryCreation, Category.create);

app.get('/user', validateToken, User.getAll);
app.get('/user/:id', validateToken, User.getById);
app.get('/categories', validateToken, Category.getAll);
app.get('/post', validateToken, Post.getAll);
app.get('/post/:id', validateToken, Post.getById);

app.listen(port, () => console.log('ouvindo porta', port));
