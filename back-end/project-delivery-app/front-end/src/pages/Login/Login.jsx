import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logofull.svg';

function Login() {
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const SUCCESSFULLY_HTTP_STATUS = 200;

  useEffect(() => {
    const MIN_PASSWORD_LENGTH = 6;
    const loginRegex = /\S+@\S+\.com/;
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.role === 'administrator') navigate('/admin/manage');
      if (user.role === 'customer') navigate('/customer/products');
      if (user.role === 'seller') navigate('/seller/orders');
    }

    if (password.length >= MIN_PASSWORD_LENGTH && loginRegex.test(email)) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email, password, navigate]);

  const login = async () => {
    const result = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await result.json();

    if (result.status !== SUCCESSFULLY_HTTP_STATUS) {
      setAuthenticated(true);
      setErrorMessage(data.message);
    } else {
      setAuthenticated(false);
      localStorage.setItem('user', JSON.stringify(data));
      if (data.role === 'seller') {
        navigate('/seller/orders');
      } else if (data.role === 'administrator') {
        navigate('/admin/manage');
      } else {
        navigate('/customer/products');
      }
    }
  };

  return (
    <section className="flexlog container mx-auto lg:mt-28">
      <div className="mt-16 flexlog min-h-full items-center justify-center">
        <img
          src={ logo }
          alt="Biri logo"
          width={ 200 }
        />
        <p className="text-lg">A biri ta para você!</p>
      </div>
      <div className="h-px w-1/4 mt-5 bg-neutral-400" />
      <form
        className="container flexlog justify-center py-8"
      >
        {authenticated && (
          <p
            data-testid="common_login__element-invalid-email"
            className="text-red-700 font-bold mb-4"
          >
            {errorMessage}
          </p>
        )}
        <label
          htmlFor="login"
          className="flexlog text-2xl py-1 px-4 my-1 sm:px-2 lg:px-4"
        >
          <input
            id="login"
            type="text"
            placeholder="Email"
            data-testid="common_login__input-email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            className="text-2x1 p-2 ring-1 rounded-lg"
          />
        </label>

        <label
          htmlFor="password"
          className="flexlog text-2xl py-1 px-4 my-1 sm:px-2 lg:px-4"
        >
          <input
            id="password"
            type="password"
            data-testid="common_login__input-password"
            value={ password }
            placeholder="Senha"
            onChange={ ({ target }) => setPassword(target.value) }
            className="text-2x1 p-2 ring-1 rounded-lg"
          />
        </label>
        <div className="mt-4 flexlog container">
          <button
            type="button"
            data-testid="common_login__button-login"
            disabled={ !valid }
            onClick={ login }
            className="text-xl font-bold my-3 w-72 py-2 ring-1
            bg-yellow-300  rounded-full transition-colors disabled:bg-red-200"
          >
            Login
          </button>
          <div className="h-px w-1/4 my-3 bg-neutral-400" />
          <button
            type="button"
            data-testid="common_login__button-register"
            onClick={ () => navigate('/register') }
            className="text-l text-yellow-800 my-3 w-72 py-2"
          >
            Ainda não tem uma conta? clique aqui
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
