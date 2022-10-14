import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../Provider/MyContext';
import './style.css';

function AdminNavbar() {
  const { setUser, user } = useContext(MyContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('shoppingCart');
    setUser('');
    navigate('/login');
  };

  return (
    <nav className="nav">
      <button
        type="button"
        onClick={ () => navigate('/customer/products') }
        className="navBoxContent produtos"
        data-testid="customer_products__element-navbar-link-orders"
      >
        GERENCIAR USUÁRIOS
      </button>
      <p
        className="navBoxContent usuarioNome"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { user ? user.name : 'user' }
      </p>
      <button
        type="button"
        className="navBoxContent logout"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ logout }
      >
        Sair
      </button>
    </nav>
  );
}

export default AdminNavbar;
