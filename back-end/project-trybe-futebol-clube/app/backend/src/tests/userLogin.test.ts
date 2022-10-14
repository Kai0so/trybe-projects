import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seção 1: Users e Login', () => {
  let chaiHttpResponse: Response;
  it('É possível realizar um login com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret_admin"
    });
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse).to.be.json;
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Não é possível realizar um login sem email ou senha no front', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "",
      password: ""
    });
    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse).to.be.json;
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
  });

  it('Não é possível realizar um login com email ou senha inválidos', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "xablau.com.br",
      password: "123456"
    });
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse).to.be.json;
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });
});