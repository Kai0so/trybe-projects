import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import logo from '../../images/LogoIcon.svg';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const [hiddenMessage, setHiddenMessage] = useState(false);

  useEffect(() => {
    const MIN_NAME_LENGTH = 12;
    const MIN_PASSWORD_LENGTH = 6;
    const emailRegex = /\S+@\S+\.com/;
    const isValid = name.length >= MIN_NAME_LENGTH && emailRegex.test(email)
      && password.trim().length >= MIN_PASSWORD_LENGTH;
    setDisabled(!isValid);
  }, [name, email, password]);

  const handleClick = async () => {
    const STATUS_CODE = 201;
    try {
      const result = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role: 'customer',
        }),
      });
      const data = await result.json();
      console.log(result, data);
      if (result.status !== STATUS_CODE) {
        setHiddenMessage(true);
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/customer/products');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center mx-auto my-12">
      <img src={ logo } alt="logo" width={ 80 } />
      <h1 className="font-bold text-2xl my-6">Cadastro</h1>
      <div className="h-px w-1/3 my-5 bg-neutral-400" />
      <form
        className="flex flex-col items-center justify-center mx-auto space-y-4
        "
      >
        <label
          htmlFor="name"
          className="text-xl items-center p-2"
        >
          Nome
          <input
            data-testid="common_register__input-name"
            type="text"
            id="name"
            placeholder="Seu nome"
            value={ name }
            className="mx-3 outline outline-1 outline-neutral-400 p-2 rounded-md"
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
        <label
          htmlFor="email"
          className="text-xl items-center p-2"
        >
          Email
          {' '}
          <input
            data-testid="common_register__input-email"
            type="text"
            id="email"
            placeholder="seu-email@site.com.br"
            value={ email }
            className="mx-3 outline outline-1 outline-neutral-400 p-2 rounded-md"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label
          htmlFor="password"
          className="text-xl items-center p-2"
        >
          Senha
          <input
            data-testid="common_register__input-password"
            type="password"
            id="password"
            placeholder="Senha"
            value={ password }
            className="mx-3 outline outline-1 outline-neutral-400 p-2 rounded-md"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          data-testid="common_register__button-register"
          type="button"
          disabled={ isDisabled }
          onClick={ handleClick }
          className="text-xl font-bold my-3 w-72 py-2 ring-1
            bg-yellow-300  rounded-full transition-colors disabled:bg-red-200"
        >
          CADASTRAR
        </button>

        { hiddenMessage && (
          <p data-testid="common_register__element-invalid_register">
            User already exists
          </p>
        )}
      </form>
      <div className="h-px w-1/3 my-5 bg-neutral-400" />
    </div>
  );
}

export default Register;
