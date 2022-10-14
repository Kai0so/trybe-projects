import React, { useContext, useEffect, useState } from 'react';
import AdminNavbar from '../../Components/AdminNavbar/AdminNavbar';
import MyContext from '../../Provider/MyContext';

function Admin() {
  const { user, setUser } = useContext(MyContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [select, setSelect] = useState('seller');
  const [hiddenMessage, setHiddenMessage] = useState(false);
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

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
      const result = await fetch('http://localhost:3001/users/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          Authorization: user.token },
        body: JSON.stringify({
          name,
          email,
          password,
          role: select,
        }),
      });
      const data = await result.json();
      console.log(result, data);
      if (result.status !== STATUS_CODE) {
        setHiddenMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <form>
        <h2>Cadastrar novo usuário</h2>
        { hiddenMessage && (
          <p data-testid="admin_manage__element-invalid-register">
            User already exists
          </p>
        )}
        <label htmlFor="name">
          Nome
          <input
            id="name"
            data-testid="admin_manage__input-name"
            type="text"
            value={ name }
            onChange={ ({ target: { value } }) => setName(value) }
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            id="email"
            data-testid="admin_manage__input-email"
            type="text"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            id="password"
            data-testid="admin_manage__input-password"
            type="password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </label>

        <label htmlFor="type">
          Tipo
          <select
            name="type"
            id="type"
            data-testid="admin_manage__select-role"
            value={ select }
            onChange={ ({ target: { value } }) => setSelect(value) }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
          </select>
        </label>
        <button
          id="submit"
          data-testid="admin_manage__button-register"
          type="button"
          onClick={ () => handleClick() }
          disabled={ isDisabled }
        >
          CADASTRAR
        </button>
      </form>
    </>
  );
}

export default Admin;
