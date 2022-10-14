const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOCONTENT = 204;
const HTTP_BADREQUEST = 400;
const HTTP_UNAUT = 401;
const HTTP_NOTFOUND = 404;
const PORT = '3000';

const talkersFile = './talker.json';
const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

//  Object Literals
function errorMessage(type) {
  const errors = {
    emailRequired: { message: 'O campo "email" é obrigatório' },
    invalidEmail: { message: 'O "email" deve ter o formato "email@email.com"' },
    passwordRequired: { message: 'O campo "password" é obrigatório' },
    invalidPassword: { message: 'O "password" deve ter pelo menos 6 caracteres' },
    talkerNotFound: { message: 'Pessoa palestrante não encontrada' },
    tokenNotFound: { message: 'Token não encontrado' },
    invalidToken: { message: 'Token inválido' },
    nameRequired: { message: 'O campo "name" é obrigatório' },
    invalidName: { message: 'O "name" deve ter pelo menos 3 caracteres' },
    ageRequired: { message: 'O campo "age" é obrigatório' },
    invalidAge: { message: 'A pessoa palestrante deve ser maior de idade' },
    tlkReq: { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    invalidFormat: { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
    invalidRate: { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
  };
  return errors[type];
}

//  Middlewares
function userValidation(req, res, next) {
  const { email, password } = req.body;

  if (!email) return res.status(HTTP_BADREQUEST).json(errorMessage('emailRequired'));
  if (!email.includes('.com', '@')) {
    return res.status(HTTP_BADREQUEST).json(errorMessage('invalidEmail'));
  } 
  if (!password) return res.status(HTTP_BADREQUEST).json(errorMessage('passwordRequired'));
  if (password.length < 6) return res.status(HTTP_BADREQUEST).json(errorMessage('invalidPassword'));

  next();
}

function tokenValidation(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(HTTP_UNAUT).json(errorMessage('tokenNotFound'));
  if (authorization.length !== 16) return res.status(HTTP_UNAUT).json(errorMessage('invalidToken'));

  next();
}

function nameValidation(req, res, next) {
  const { name } = req.body;

  if (!name) return res.status(HTTP_BADREQUEST).json(errorMessage('nameRequired'));
  if (name.length < 3) return res.status(HTTP_BADREQUEST).json(errorMessage('invalidName'));

  next();
}

function ageValidation(req, res, next) {
  const { age } = req.body;

  if (!age) return res.status(HTTP_BADREQUEST).json(errorMessage('ageRequired'));
  if (parseFloat(age) < 18) return res.status(HTTP_BADREQUEST).json(errorMessage('invalidAge'));

  next();
}

function talkValidation(req, res, next) {
  const { talk } = req.body;

  if (talk === undefined || talk.watchedAt === undefined || talk.rate === undefined) {
    return res.status(HTTP_BADREQUEST).json(errorMessage('tlkReq'));
  }

  next();
}

function dateValidation(req, res, next) {
  const { talk } = req.body;

  if (!dateRegex.test(talk.watchedAt)) {
    return res.status(HTTP_BADREQUEST).json(errorMessage('invalidFormat'));
  }

  next();
}

function rateValidation(req, res, next) {
  const { talk } = req.body;

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(HTTP_BADREQUEST).json(errorMessage('invalidRate'));
  }

  next();
}

//  Endpoints
app.get('/talker', async (_req, res) => {
  const talkers = JSON.parse(await fs.readFile(talkersFile));

  return res.status(HTTP_OK).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile(talkersFile));
  const talker = talkers.find((t) => t.id === parseFloat(id));

  if (!talker) return res.status(HTTP_NOTFOUND).json(errorMessage('talkerNotFound'));
  return res.status(HTTP_OK).json(talker);
});

app.post('/login', userValidation, (_req, res) => {
  const token = randomBytes(8).toString('hex');

  return res.status(HTTP_OK).json({ token });
});

app.post('/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  dateValidation,
  rateValidation,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = JSON.parse(await fs.readFile(talkersFile));
    const talker = { id: talkers.length + 1, name, age, talk };
    const updatedTalkerList = [...talkers, talker];

    await fs.writeFile(talkersFile, JSON.stringify(updatedTalkerList));
    return res.status(HTTP_CREATED).json(talker);
});

app.put('/talker/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  dateValidation,
  rateValidation,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = JSON.parse(await fs.readFile(talkersFile));
    const talkerIndex = talkers.findIndex((t) => t.id === parseFloat(id));
    const updatedTalkerList = [talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk }];

    await fs.writeFile(talkersFile, JSON.stringify(updatedTalkerList));
    return res.status(HTTP_OK).json(talkers[talkerIndex]);
});

app.delete('/talker/:id', tokenValidation, async (req, res) => {
    const { id } = req.params;
    const talkers = JSON.parse(await fs.readFile(talkersFile));
    const talkerIndex = talkers.findIndex((t) => t.id === parseFloat(id));

    talkers.splice(talkerIndex, 1);
    await fs.writeFile(talkersFile, JSON.stringify(talkers));
    return res.status(HTTP_NOCONTENT).end();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
